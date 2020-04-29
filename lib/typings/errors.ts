export class BaseError extends Error {
	constructor(message?: string) {
		const trueProto = new.target.prototype;
		super(message);
		Object.setPrototypeOf(this, trueProto);
	}
}

export class ClientConstructionError extends BaseError {
	constructor(params: any) {
		super(`IntercomClient could not be constructed with the following parameters ${JSON.stringify(params)}`);
		this.name = 'IntercomClientError';
	}
}
