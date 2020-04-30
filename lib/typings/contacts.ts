import { IntercomList, StringOrNull, BooleanOrNull, NumberOrNull } from './common';
import { SocialProfilesList } from './social_profiles';

export interface DeleteContactResponse {
	id: string;
	object: 'contact';
	deleted: boolean;
}

export type ContactRole = 'user' | 'lead';
export interface CreateOrUpdateContactModel {
	role: ContactRole;
	external_id: string;
	email: string;
	phone?: string;
	name?: string;
	avatar?: string;
	signed_up_at?: number;
	last_seen_at?: number;
	owner_id?: number;
	unsubscribed_from_emails?: boolean;
	custom_attributes?: Object;
}

export interface ContactsList extends IntercomList<ContactModel> {}

// https://developers.intercom.com/intercom-api-reference/reference#contacts-model
export interface ContactModel {
	type: 'contact';
	id: string;
	workspace_id: string;
	external_id: string;
	role: ContactRole;
	email: string;
	phone: StringOrNull;
	name: StringOrNull;
	avatar: StringOrNull;
	owner_id: NumberOrNull;
	social_profiles: SocialProfilesList;
	has_hard_bounced: BooleanOrNull;
	marked_email_as_spam: BooleanOrNull;
	unsubscribed_from_emails: BooleanOrNull;
	created_at: NumberOrNull;
	update_at: NumberOrNull;
	signed_up_at: NumberOrNull;
	last_seen_at: NumberOrNull;
	last_replied_at: NumberOrNull;
	last_contacted_at: NumberOrNull;
	last_email_opened_at: NumberOrNull;
	last_email_clicked_at: NumberOrNull;
	language_override: StringOrNull;
	browser: StringOrNull;
	browser_version: StringOrNull;
	os: StringOrNull;
	browser_language: StringOrNull;
	android_app_name: StringOrNull;
	android_app_version: StringOrNull;
	android_device: StringOrNull;
	android_os_device: StringOrNull;
	android_sdk_version: StringOrNull;
	android_last_seen_at: NumberOrNull;
	ios_app_name: StringOrNull;
	ios_app_version: StringOrNull;
	ios_os_version: StringOrNull;
	ios_sdk_version: StringOrNull;
	ios_last_seen_at: NumberOrNull;
	custom_attributes: Object;
}
