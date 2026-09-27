/**
 * Thrown for any non-2xx response from the MailCraft API.
 *
 * Mirrors the two error shapes the API actually returns:
 *  - `{"error": {"type": "...", "message": "..."}}` for business-rule
 *    failures (plan limits, suppressed recipients, etc).
 *  - `{"message": "...", "errors": {"field": ["..."]}}` for Laravel
 *    validation failures (422 responses).
 */
export class MailCraftApiError extends Error {
    readonly status: number;
    readonly type?: string;
    readonly errors?: Record<string, string[]>;

    constructor(
        status: number,
        message: string,
        options?: { type?: string; errors?: Record<string, string[]> },
    ) {
        super(message);
        this.name = 'MailCraftApiError';
        this.status = status;
        this.type = options?.type;
        this.errors = options?.errors;
    }

    /** @internal */
    static async fromResponse(response: Response): Promise<MailCraftApiError> {
        let body: unknown;

        try {
            body = await response.json();
        } catch {
            body = null;
        }

        if (body && typeof body === 'object' && 'error' in body) {
            const error = (
                body as { error: { type?: string; message?: string } }
            ).error;

            return new MailCraftApiError(
                response.status,
                error.message ?? response.statusText,
                {
                    type: error.type,
                },
            );
        }

        if (body && typeof body === 'object' && 'message' in body) {
            const { message, errors } = body as {
                message: string;
                errors?: Record<string, string[]>;
            };

            return new MailCraftApiError(response.status, message, { errors });
        }

        return new MailCraftApiError(response.status, response.statusText);
    }
}
