import { IClient } from '..';

export abstract class IIntercomAPI {
	protected readonly _client: IClient;

	constructor(client: IClient) {
		this._client = client;
	}

	public abstract archive(data: any): Promise<any>;
	public abstract create(data: any): Promise<any>;
	public abstract find(data: any): Promise<any>;
	public abstract list(): Promise<any>;
	public abstract listBy(data: any): Promise<any>;
	public abstract delete(data: any): Promise<any>;
}
