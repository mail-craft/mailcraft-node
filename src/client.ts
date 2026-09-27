import { MailCraftApiError } from './error.js';

export type ClientOptions = {
    /** Defaults to `https://api.mailcraft.host/v1`. */
    baseUrl?: string;
    /** Request timeout in milliseconds. Defaults to 30000. */
    timeoutMs?: number;
};

export type QueryParams = Record<string, string | number | boolean | undefined>;

/**
 * Thin fetch-based HTTP client shared by every resource. Not exported —
 * consumers only ever interact with the typed resource classes.
 *
 * @internal
 */
export class HttpClient {
    private readonly baseUrl: string;
    private readonly timeoutMs: number;

    constructor(
        private readonly apiKey: string,
        options: ClientOptions = {},
    ) {
        if (!apiKey) {
            throw new Error(
                'MailCraft: an API key is required. Find yours under Settings > API Keys.',
            );
        }

        this.baseUrl = (
            options.baseUrl ?? 'https://api.mailcraft.host/v1'
        ).replace(/\/+$/, '');
        this.timeoutMs = options.timeoutMs ?? 30_000;
    }

    get<T>(path: string, query?: QueryParams): Promise<T> {
        return this.request<T>('GET', path, undefined, query);
    }

    post<T>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('POST', path, body);
    }

    patch<T>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('PATCH', path, body);
    }

    delete<T = void>(path: string): Promise<T> {
        return this.request<T>('DELETE', path);
    }

    private async request<T>(
        method: string,
        path: string,
        body?: unknown,
        query?: QueryParams,
    ): Promise<T> {
        const url = new URL(this.baseUrl + path);

        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined) {
                    url.searchParams.set(key, String(value));
                }
            }
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent': 'mailcraft-node/1.0.0',
                },
                body: body !== undefined ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            if (!response.ok) {
                throw await MailCraftApiError.fromResponse(response);
            }

            if (response.status === 204) {
                return undefined as T;
            }

            return (await response.json()) as T;
        } finally {
            clearTimeout(timeout);
        }
    }
}
