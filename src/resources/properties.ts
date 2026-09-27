import type { HttpClient } from '../client.js';
import type { ItemResponse, ListResponse, Property } from '../types.js';

export class PropertiesResource {
    constructor(private readonly client: HttpClient) {}

    create(params: {
        key: string;
        label: string;
        type: Property['type'];
        default_value?: unknown;
    }): Promise<ItemResponse<Property>> {
        return this.client.post('/properties', params);
    }

    list(): Promise<ListResponse<Property>> {
        return this.client.get('/properties');
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/properties/${id}`);
    }
}
