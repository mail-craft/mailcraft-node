import type { HttpClient } from '../client.js';
import type {
    ItemResponse,
    ListResponse,
    Segment,
    SegmentFilters,
} from '../types.js';

export class SegmentsResource {
    constructor(private readonly client: HttpClient) {}

    create(params: {
        name: string;
        description?: string;
        filters: SegmentFilters;
    }): Promise<ItemResponse<Segment>> {
        return this.client.post('/segments', params);
    }

    list(): Promise<ListResponse<Segment>> {
        return this.client.get('/segments');
    }

    get(id: number): Promise<ItemResponse<Segment>> {
        return this.client.get(`/segments/${id}`);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/segments/${id}`);
    }
}
