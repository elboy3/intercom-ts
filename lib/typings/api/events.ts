import { IntercomList } from '../common';

// https://developers.intercom.com/intercom-api-reference/reference#event-model
export interface EventModel {
	event_name: string;
	created_at: number;
	user_id?: string;
	id?: string;
	email?: string;
	metadata?: {
		[key: string]: any;
	};
}

export interface EventsList extends IntercomList<EventModel> {}
