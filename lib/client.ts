import qs from 'qs';
import axios, { AxiosInstance } from 'axios';

import { IntercomContactsAPI } from './api';
import { determineIfTokenAuth, determineIfAPIKeyAuth } from './utils';
import { ClientAuth, ClientConstructionError, IntercomAuth, IClient, IntercomVersion } from './typings';

export class IntercomClient extends IClient {
	private static _instance: IntercomClient;
	private readonly _http: AxiosInstance;
	private readonly _auth: IntercomAuth;
	private readonly _intercomVersion: IntercomVersion = '2.0';

	public contacts: IntercomContactsAPI;

	private constructor(auth: ClientAuth, intercomVersion?: IntercomVersion) {
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

		this._http = axios.create({
			baseURL: 'https://api.intercom.io',
			auth: this._auth,
			headers: {
				'Intercom-Version': this._intercomVersion
			}
		});
	}

	public static getInstance(auth: ClientAuth, intercomVersion?: IntercomVersion): IntercomClient {
		if (!IntercomClient._instance) {
			IntercomClient._instance = new IntercomClient(auth, intercomVersion);
			// ... any one time initialization goes here ...
			IntercomClient._instance.contacts = new IntercomContactsAPI(IntercomClient._instance);
		}
		return IntercomClient._instance;
	}

	public get intercomVersion() {
		return this._intercomVersion;
	}

	public get = async <R, Q>(endpoint: string, query?: Q) => {
		const url = query ? endpoint + `?${qs.stringify(query)}` : endpoint;
		return await this._http.get<R>(url);
	};

	public put = async <R, D>(endpoint: string, data: D) => {
		return await this._http.put<R>(endpoint, data);
	};

	public post = async <R, D>(endpoint: string, data: D) => {
		return await this._http.post<R>(endpoint, data);
	};

	public delete = async <D, Q>(endpoint: string, query?: Q) => {
		return await this._http.delete<D>(query ? endpoint + `?${qs.stringify(query)}` : endpoint);
	};
}
