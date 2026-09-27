import type { HttpClient } from '../client.js';
import type {
    Email,
    EmailValidation,
    ItemResponse,
    ListResponse,
    SendEmailParams,
} from '../types.js';

export class EmailsResource {
    constructor(private readonly client: HttpClient) {}

    /** Send a single transactional email. Returns immediately with `status: "queued"` — the send happens asynchronously. */
    send(params: SendEmailParams): Promise<ItemResponse<Email>> {
        return this.client.post('/emails', params);
    }

    list(params?: { limit?: number }): Promise<ListResponse<Email>> {
        return this.client.get('/emails', params);
    }

    get(id: string): Promise<ItemResponse<Email>> {
        return this.client.get(`/emails/${id}`);
    }

    /** Validate an email address's format, MX record, and disposable-domain status. */
    validate(email: string): Promise<EmailValidation> {
        return this.client.get('/emails/validate', { email });
    }
}
