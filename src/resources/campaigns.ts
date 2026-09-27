import type { HttpClient } from '../client.js';
import type { Campaign, ItemResponse, ListResponse } from '../types.js';

export class CampaignsResource {
    constructor(private readonly client: HttpClient) {}

    /** Create a draft campaign targeting exactly one of `list_id` or `segment_id`. */
    create(params: {
        name: string;
        subject: string;
        template_id: number;
        sender_id: number;
        list_id?: number;
        segment_id?: number;
    }): Promise<ItemResponse<Campaign>> {
        return this.client.post('/campaigns', params);
    }

    list(): Promise<ListResponse<Campaign>> {
        return this.client.get('/campaigns');
    }

    get(id: number): Promise<ItemResponse<Campaign>> {
        return this.client.get(`/campaigns/${id}`);
    }

    /** Send a draft campaign immediately. */
    send(id: number): Promise<ItemResponse<Campaign>> {
        return this.client.post(`/campaigns/${id}/send`);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/campaigns/${id}`);
    }
}
