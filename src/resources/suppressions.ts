import type { HttpClient } from '../client.js';
import type { ItemResponse, ListResponse, Suppression } from '../types.js';

export class SuppressionsResource {
    constructor(private readonly client: HttpClient) {}

    add(params: {
        email: string;
        reason?: Suppression['reason'];
    }): Promise<ItemResponse<Suppression>> {
        return this.client.post('/suppressions', params);
    }

    list(params?: { limit?: number }): Promise<ListResponse<Suppression>> {
        return this.client.get('/suppressions', params);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/suppressions/${id}`);
    }
}
