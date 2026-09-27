import type { HttpClient } from '../client.js';
import type {
    Contact,
    ItemResponse,
    ListResponse,
    MailingList,
    UpsertContactParams,
} from '../types.js';

export class ContactsResource {
    constructor(private readonly client: HttpClient) {}

    /** Create a contact, or update it if one already exists for this email. */
    upsert(params: UpsertContactParams): Promise<ItemResponse<Contact>> {
        return this.client.post('/contacts', params);
    }

    list(params?: { limit?: number }): Promise<ListResponse<Contact>> {
        return this.client.get('/contacts', params);
    }

    get(id: string): Promise<ItemResponse<Contact>> {
        return this.client.get(`/contacts/${id}`);
    }

    delete(id: string): Promise<void> {
        return this.client.delete(`/contacts/${id}`);
    }

    /** Unsubscribe a contact — also suppresses them from future sends. */
    unsubscribe(id: string): Promise<ItemResponse<Contact>> {
        return this.client.post(`/contacts/${id}/unsubscribe`);
    }

    addToLists(id: string, listIds: number[]): Promise<void> {
        return this.client.post(`/contacts/${id}/lists`, { list_ids: listIds });
    }

    lists(id: string): Promise<ListResponse<MailingList>> {
        return this.client.get(`/contacts/${id}/lists`);
    }

    removeFromList(id: string, listId: number): Promise<void> {
        return this.client.delete(`/contacts/${id}/lists/${listId}`);
    }
}
