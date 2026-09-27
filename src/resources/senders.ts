import type { HttpClient } from '../client.js';
import type { ItemResponse, ListResponse, Sender } from '../types.js';

export class SendersResource {
    constructor(private readonly client: HttpClient) {}

    create(params: {
        domain_id: number;
        email: string;
        name: string;
        reply_to?: string;
    }): Promise<ItemResponse<Sender>> {
        return this.client.post('/senders', params);
    }

    list(): Promise<ListResponse<Sender>> {
        return this.client.get('/senders');
    }

    get(id: number): Promise<ItemResponse<Sender>> {
        return this.client.get(`/senders/${id}`);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/senders/${id}`);
    }
}
