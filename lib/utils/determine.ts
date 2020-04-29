import { ClientAuth, TokenAuth, APIKeyAuth } from '../typings';

export function determineIfTokenAuth(toBeDetermined: ClientAuth): toBeDetermined is TokenAuth {
	if ((toBeDetermined as TokenAuth).token) return true;

	return false;
}

export function determineIfAPIKeyAuth(toBeDetermined: ClientAuth): toBeDetermined is APIKeyAuth {
	if ((toBeDetermined as APIKeyAuth).appId && (toBeDetermined as APIKeyAuth).appApiKey) return true;

	return false;
}
