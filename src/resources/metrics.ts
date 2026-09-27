import type { HttpClient } from '../client.js';
import type { MetricsResponse, Reputation } from '../types.js';

export class MetricsResource {
    constructor(private readonly client: HttpClient) {}

    /** Get daily email metrics over a date range (defaults to the last 30 days). */
    get(params?: {
        start_date?: string;
        end_date?: string;
    }): Promise<MetricsResponse> {
        return this.client.get('/metrics', params);
    }

    /** Get the rolling 7-day sending reputation (bounce/complaint rate). */
    reputation(): Promise<{ data: Reputation }> {
        return this.client.get('/reputation');
    }
}
