import { AxiosResponse } from 'axios';
import {
	IClient,
	EventModel,
	SearchByEmail,
	SearchByUserId,
	SearchByIntercomUserId
} from '../typings';

import {
	determineIfSearchByUserId,
	determineIfSearchByIntercomUserId,
	determineIfSearchByEmail
} from '../utils';

export class IntercomEventsAPI {
	private readonly _client: IClient;
	constructor(client: IClient) {
		this._client = client;
	}

	public async create(data: EventModel): Promise<AxiosResponse<{}>> {
		return await this._client.post<{}, EventModel>('/events', data);
	}

	public async list(
		query: SearchByUserId | SearchByEmail | SearchByIntercomUserId
	): Promise<AxiosResponse<any>> {
		if (determineIfSearchByUserId(query))
			return await this._client.get('/events', {
				type: 'user',
				user_id: query.user_id
			});
		else if (determineIfSearchByIntercomUserId(query))
			return await this._client.get('/events', {
				type: 'user',
				intercom_user_id: query.intercom_user_id
			});
		else if (determineIfSearchByEmail(query))
			return await this._client.get('/events', {
				type: 'user',
				email: query.email
			});
		else
			throw new Error(
				"Listing event's may only be queried by the following 'user_id, email, intercom_user_id'?"
			);
	}
}
