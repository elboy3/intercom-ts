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
		return await this._client.post<ContactModel, CreateOrUpdateContactModel>(
			'/contacts',
			data
		);
	}

	public async delete(
		id: string
	): Promise<AxiosResponse<DeleteContactResponse>> {
		return await this._client.delete<DeleteContactResponse, undefined>(
			`/contacts/${id}`
		);
	}

	public async find(
		query: SearchById | SearchByEmail | SearchByExternalId
	): Promise<any> {
		if (determineIfSearchById(query))
			return await this._client.get<any, any>(`/contacts/${query.id}`);
		else if (determineIfSearchByEmail(query))
			return await this.searchByEmail(query.email);
		else if (determineIfSearchByExternalId(query))
			return await this.searchByExternalId(query.external_id);
	}

	public async list(starting_after: string): Promise<AxiosResponse<ContactsList>> {
		return await this._client.get<ContactsList, undefined>('/contacts?starting_after=' + starting_after);
	}

	public async search(
		search: IntercomSearch
	): Promise<AxiosResponse<ContactsList>> {
		return await this._client.post<ContactsList, IntercomSearch>(
			'/contacts/search',
			search
		);
	}

	public async update(
		id: string,
		data: CreateOrUpdateContactModel
	): Promise<AxiosResponse<ContactModel>> {
		return await this._client.put<ContactModel, CreateOrUpdateContactModel>(
			`/contacts/${id}`,
			data
		);
	}

	public async merge(
		from: string,
		into: string
	): Promise<AxiosResponse<ContactModel>> {
		return await this._client.post<ContactModel, MergeModel>(
			`/contacts/merge`,
			{ from, into }
		);
	}

	public async createCompany(
		data: CreateOrUpdateCompanyModel
	): Promise<AxiosResponse<CompanyModel>> {
		return await this._client.post<CompanyModel, CreateOrUpdateCompanyModel>(
			`/companies`,
			data
		);
	}

	public async attachCompanyToContact(
		contactId: string,
		companyId: string
	): Promise<AxiosResponse<CompanyModel>> {
		return await this._client.post<CompanyModel, Record<string, string>>(
			`/contacts/${contactId}/companies`,
			{ id: companyId }
		);
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
