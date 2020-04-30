export type IntercomErrorCodes =
	| 'server_error'
	| 'client_error'
	| 'type_mismatch'
	| 'parameter_not_found'
	| 'parameter_invalid'
	| 'action_forbidden'
	| 'conflict'
	| 'api_plan_restricted'
	| 'rate_limit_exceeded'
	| 'unsupported'
	| 'token_revoked'
	| 'token_blocked'
	| 'token_not_found'
	| 'token_unauthorized'
	| 'token_expired'
	| 'token_not_found'
	| 'missing_authorization'
	| 'retry_after'
	| 'job_closed'
	| 'not_restorable'
	| 'team_not_found'
	| 'team_unavailable'
	| 'not_found'
	| 'admin_not_found';

export interface IIntercomErrorResponse {
	type: 'error.list';
	request_id: string;
	errors: [
		{
			code: IntercomErrorCodes;
			message: string;
		}
	];
}

export interface IntercomError {
	type: 'error.list';
}

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
