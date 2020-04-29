import { IClient, IIntercomAPI } from '../typings';

export class IntercomContactsAPI extends IIntercomAPI {
	constructor(client: IClient) {
		super(client);

		console.dir('client', client);
	}

	public archive(data: any): Promise<any> {
		throw new Error('Method not implemented.');
	}

	public create(data: any): Promise<any> {
		throw new Error('Method not implemented.');
	}

	public find(query: any): Promise<any> {
		if (query.id) return this._client.get<any, any>(`/contacts/${query.id}`);
		return this._client.get<any, any>('/contacts', query);
	}

	public list(): Promise<any> {
		return this._client.get<any, any>('/contacts');
	}

	public listBy(data: any): Promise<any> {
		throw new Error('Method not implemented.');
	}

	public delete(data: any): Promise<any> {
		throw new Error('Method not implemented.');
	}
}
