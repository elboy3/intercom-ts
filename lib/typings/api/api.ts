import { IClient } from '../client';
import { IntercomSearch } from '../search';

export abstract class IIntercomAPI {
	protected readonly _client: IClient;

	constructor(client: IClient) {
		this._client = client;
	}

	public abstract create(data: any): Promise<any>;
	public abstract delete(id: string): Promise<any>;
	public abstract find(data: any): Promise<any>;
	public abstract list(): Promise<any>;
	public abstract search(search: IntercomSearch): Promise<any>;
	public abstract update(id: string, data: any): Promise<any>;
}
