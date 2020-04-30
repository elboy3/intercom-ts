// https://developers.intercom.com/intercom-api-reference/reference#section-location-object
export interface Location {
	type: 'location';
	country: string;
	region: string;
	city: string;
}
