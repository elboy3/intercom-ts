// https://developers.intercom.com/intercom-api-reference/reference#section-addressable-list
export interface AdressableList<T> {
	type: 'list';
	data: T;
	url: string;
	total_count: number;
	has_more: boolean;
}

// https://developers.intercom.com/intercom-api-reference/reference#section-addressable-object
export interface Adressable {
	type: 'company' | 'note' | 'tag';
	id: string;
	url: string;
}
