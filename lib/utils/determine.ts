import {
	ClientAuth,
	TokenAuth,
	APIKeyAuth,
	IntercomSearch,
	SearchById,
	SearchByEmail,
	SearchByExternalId,
	SearchByUserId,
	SearchByIntercomUserId
} from '../typings';

export function determineIfTokenAuth(toBeDetermined: ClientAuth): toBeDetermined is TokenAuth {
	if ((toBeDetermined as TokenAuth).token) return true;

	return false;
}

export function determineIfAPIKeyAuth(toBeDetermined: ClientAuth): toBeDetermined is APIKeyAuth {
	if ((toBeDetermined as APIKeyAuth).appId && (toBeDetermined as APIKeyAuth).appApiKey) return true;

	return false;
}

export function determineIfSearchById(toBeDetermined: IntercomSearch): toBeDetermined is SearchById {
	if ((toBeDetermined as SearchById).id) return true;

	return false;
}

export function determineIfSearchByEmail(toBeDetermined: IntercomSearch): toBeDetermined is SearchByEmail {
	if ((toBeDetermined as SearchByEmail).email) return true;

	return false;
}

export function determineIfSearchByExternalId(toBeDetermined: IntercomSearch): toBeDetermined is SearchByExternalId {
	if ((toBeDetermined as SearchByExternalId).external_id) return true;

	return false;
}
export function determineIfSearchByUserId(toBeDetermined: IntercomSearch): toBeDetermined is SearchByUserId {
	if ((toBeDetermined as SearchByUserId).user_id) return true;

	return false;
}
export function determineIfSearchByIntercomUserId(toBeDetermined: IntercomSearch): toBeDetermined is SearchByIntercomUserId {
	if ((toBeDetermined as SearchByIntercomUserId).intercom_user_id) return true;

	return false;
}
