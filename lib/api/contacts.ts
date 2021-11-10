import {
	SearchById,
	SearchByEmail,
	SearchByExternalId,
	IClient,
	IIntercomAPI,
	IntercomSearch,
	ContactsList,
	ContactModel,
	DeleteContactResponse,
	CreateOrUpdateContactModel,
	MergeModel,
	CompanyModel,
	CreateOrUpdateCompanyModel
} from '../typings';
import { AxiosResponse } from 'axios';
import {
	determineIfSearchById,
	determineIfSearchByEmail,
	determineIfSearchByExternalId
} from '../utils';

export class IntercomContactsAPI extends IIntercomAPI {
	constructor(client: IClient) {
		super(client);
	}

	public async create(
		data: CreateOrUpdateContactModel
	): Promise<AxiosResponse<ContactModel>> {
		const resp = await this._client.post<ContactModel, CreateOrUpdateContactModel>(
			'/contacts',
			data
		);
		return resp.data
	}

	public async delete(
		id: string
	): Promise<AxiosResponse<DeleteContactResponse>> {
		const resp = await this._client.delete<DeleteContactResponse, undefined>(
			`/contacts/${id}`
		);
		return resp.data;
	}

	public async find(
		query: SearchById | SearchByEmail | SearchByExternalId
	): Promise<any> {
		if (determineIfSearchById(query)){
			const resp = await this._client.get<any, any>(`/contacts/${query.id}`);
			return resp.data;
		} else if (determineIfSearchByEmail(query)) {
			return await this.searchByEmail(query.email);
		} else if (determineIfSearchByExternalId(query)){
			return await this.searchByExternalId(query.external_id);
		}
	}

	public async findUserByEmail(
		email: string
	): Promise<any> {
		const searchResults = await this.search({
			query: {
				operator: "AND",
				value: [
					{
						field: "email",
						operator: "=",
						value: email
					},
					{
						field: "role",
						operator: "=",
						value: "user"
					}
				]
			}
		});
		// Return first (and only) user with queried email
		return searchResults[0];
	}

	public async list(starting_after: string): Promise<AxiosResponse<ContactsList>> {
		const resp = await this._client.get<ContactsList, undefined>('/contacts?starting_after=' + starting_after);
		return resp.data;
	}

	public async search(
		search: IntercomSearch
	): Promise<AxiosResponse<ContactsList>> {
		const resp = await this._client.post<ContactsList, IntercomSearch>(
			'/contacts/search',
			search
		);
		return resp.data.data;
	}

	public async update(
		id: string,
		data: CreateOrUpdateContactModel
	): Promise<AxiosResponse<ContactModel>> {
		const resp = await this._client.put<ContactModel, CreateOrUpdateContactModel>(
			`/contacts/${id}`,
			data
		);
		return resp.data;
	}

	public async merge(
		from: string,
		into: string
	): Promise<AxiosResponse<ContactModel>> {
		const resp = await this._client.post<ContactModel, MergeModel>(
			`/contacts/merge`,
			{ from, into }
		);
		return resp.data;
	}

	public async createCompany(
		data: CreateOrUpdateCompanyModel
	): Promise<AxiosResponse<CompanyModel>> {
		const resp = await this._client.post<CompanyModel, CreateOrUpdateCompanyModel>(
			`/companies`,
			data
		);
		return resp.data;
	}

	public async attachCompanyToContact(
		contactId: string,
		companyId: string
	): Promise<AxiosResponse<CompanyModel>> {
		const resp = await this._client.post<CompanyModel, Record<string, string>>(
			`/contacts/${contactId}/companies`,
			{ id: companyId }
		);
		return resp.data
	}

	private async searchByEmail(email: string) {
		return await this.search({
			query: {
				field: 'email',
				operator: '=',
				value: email
			}
		});
	}

	private async searchByExternalId(external_id: string) {
		return await this.search({
			query: {
				field: 'external_id',
				operator: '=',
				value: external_id
			}
		});
	}
}
