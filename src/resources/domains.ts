import type { HttpClient } from '../client.js';
import type { Domain, ItemResponse, ListResponse } from '../types.js';

export class DomainsResource {
    constructor(private readonly client: HttpClient) {}

    create(params: {
        name: string;
        region?: string;
    }): Promise<ItemResponse<Domain>> {
        return this.client.post('/domains', params);
    }

    list(): Promise<ListResponse<Domain>> {
        return this.client.get('/domains');
    }

    get(id: number): Promise<ItemResponse<Domain>> {
        return this.client.get(`/domains/${id}`);
    }

    /** Re-check DKIM verification status against SES. */
    verify(id: number): Promise<ItemResponse<Domain>> {
        return this.client.post(`/domains/${id}/verify`);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/domains/${id}`);
    }
}
