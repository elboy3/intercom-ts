import qs from 'qs';
import axios, { AxiosInstance } from 'axios';

import { IntercomContactsAPI } from './api';
import { determineIfTokenAuth, determineIfAPIKeyAuth } from './utils';
import {
	ClientAuth,
	ClientConstructionError,
	IntercomAuth,
	IClient,
	IntercomVersion
} from './typings';
import { IntercomEventsAPI } from './api/events';

const useRateLimiter = require('axios-rate-limit');

export class IntercomClient extends IClient {
	private readonly _http: AxiosInstance;
	private readonly _auth: IntercomAuth;
	private readonly _intercomVersion: IntercomVersion = '2.0';
	private readonly _baseURL: string = 'https://api.intercom.io';

	public contacts: IntercomContactsAPI;
	public events: IntercomEventsAPI;

	constructor(auth: ClientAuth, intercomVersion?: IntercomVersion) {
		super();
		if (determineIfTokenAuth(auth)) {
			this._auth = {
				username: auth.token,
				password: ''
			};
		} else if (determineIfAPIKeyAuth(auth)) {
			this._auth = {
				username: auth.appId,
				password: auth.appApiKey
			};
		} else throw new ClientConstructionError(auth);

		if (intercomVersion) this._intercomVersion = intercomVersion;

		this._http = useRateLimiter(
			axios.create({
				baseURL: this._baseURL,
				auth: this._auth,
				headers: {
					'Intercom-Version': this._intercomVersion
				}
			}),
			{ maxRequests: 100, perMilliseconds: 10000 }
		);

		this.events = new IntercomEventsAPI(this);
		this.contacts = new IntercomContactsAPI(this);
	}

	public get intercomVersion() {
		return this._intercomVersion;
	}

	public get = async <ResponseData, Query>(endpoint: string, query?: Query) => {
		return await this._http.get<ResponseData>(
			query ? endpoint + `?${qs.stringify(query)}` : endpoint
		);
	};

	public put = async <ResponseData, Data>(endpoint: string, data: Data) => {
		return await this._http.put<ResponseData>(endpoint, data);
	};

	public post = async <ResponseData, Data>(endpoint: string, data: Data) => {
		return await this._http.post<ResponseData>(endpoint, data);
	};

	public delete = async <ResponseData, Query>(
		endpoint: string,
		query?: Query
	) => {
		return await this._http.delete<ResponseData>(
			query ? endpoint + `?${qs.stringify(query)}` : endpoint
		);
	};
}
