export type StringOrNull = string | null;

export type BooleanOrNull = boolean | null;

export type NumberOrNull = number | null;

export interface IntercomList<T> {
	type: 'list';
	data: Array<T>;
	total_count: number;
	pages: any;
}

export interface Pages {
	type: 'pages';
	page: number;
	per_page: number;
	total_pages: number;
}
