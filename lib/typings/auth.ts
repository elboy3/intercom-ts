export type TokenAuth = { token: string };
export type APIKeyAuth = { appId: string; appApiKey: string };
export type ClientAuth = TokenAuth | APIKeyAuth;
export interface IntercomAuth {
	username: string;
	password: string;
}
