import { IntercomList } from './common';

export interface SocialProfilesList extends IntercomList<SocialProfile> {}

// https://developers.intercom.com/intercom-api-reference/reference#section-social-profile-object
export interface SocialProfile {
	type: 'social_profile';
	name: string;
	url: string;
}
