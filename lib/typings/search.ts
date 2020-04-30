import { IntercomSingleQuery, IntercomMultipleQuery, IntercomNestedQuery } from './query';

export interface ISingleFilter {
	query: IntercomSingleQuery;
}

export interface IMultipleFilter {
	query: IntercomMultipleQuery;
}

export interface INestedFilter {
	query: IntercomNestedQuery;
}

export type IntercomSearch = ISingleFilter | IMultipleFilter | INestedFilter | Object;

export type SearchById = { id: string };
export type SearchByEmail = { email: string };
export type SearchByExternalId = { external_id: string };
export type IntercomFind = SearchById | SearchByEmail | SearchByExternalId;
