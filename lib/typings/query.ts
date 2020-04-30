import { IntercomOperators } from './operators';

export interface QueryOptions {
	operator: IntercomOperators;
}

export interface IntercomSingleQuery {
	field: string;
	operator: IntercomOperators;
	value: any;
}

export interface IntercomMultipleQuery {
	operator: 'AND' | 'OR';
	value: Array<IntercomSingleQuery>;
}

export interface IntercomNestedQuery {
	operator: 'AND' | 'OR';
	value: Array<IntercomMultipleQuery>;
}

export type ContactsQuery = { id: string } | { email: string } | { user_id: string };
