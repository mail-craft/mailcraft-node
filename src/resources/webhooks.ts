import type { HttpClient } from '../client.js';
import type { ItemResponse, ListResponse, Webhook } from '../types.js';

export class WebhooksResource {
    constructor(private readonly client: HttpClient) {}

    create(params: {
        url: string;
        description?: string;
        events: string[];
    }): Promise<ItemResponse<Webhook>> {
        return this.client.post('/webhooks', params);
    }

    list(): Promise<ListResponse<Webhook>> {
        return this.client.get('/webhooks');
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/webhooks/${id}`);
    }
}
