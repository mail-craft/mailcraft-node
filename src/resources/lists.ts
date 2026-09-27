import type { HttpClient } from '../client.js';
import type { ItemResponse, ListResponse, MailingList } from '../types.js';

export class ListsResource {
    constructor(private readonly client: HttpClient) {}

    create(params: {
        name: string;
        description?: string;
        type?: 'static' | 'dynamic';
        segment_id?: number;
    }): Promise<ItemResponse<MailingList>> {
        return this.client.post('/lists', params);
    }

    list(): Promise<ListResponse<MailingList>> {
        return this.client.get('/lists');
    }

    get(id: number): Promise<ItemResponse<MailingList>> {
        return this.client.get(`/lists/${id}`);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/lists/${id}`);
    }
}
