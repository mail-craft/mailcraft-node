import { type ClientOptions, HttpClient } from './client.js';
import { CampaignsResource } from './resources/campaigns.js';
import { ContactsResource } from './resources/contacts.js';
import { DomainsResource } from './resources/domains.js';
import { EmailsResource } from './resources/emails.js';
import { ListsResource } from './resources/lists.js';
import { MetricsResource } from './resources/metrics.js';
import { PropertiesResource } from './resources/properties.js';
import { SegmentsResource } from './resources/segments.js';
import { SendersResource } from './resources/senders.js';
import { SuppressionsResource } from './resources/suppressions.js';
import {
    TemplateFoldersResource,
    TemplatesResource,
} from './resources/templates.js';
import { WebhooksResource } from './resources/webhooks.js';

export { MailCraftApiError } from './error.js';
export * from './types.js';

/**
 * The MailCraft API client.
 *
 * @example
 * ```ts
 * import { MailCraft } from '@mailcraft/node';
 *
 * const mailcraft = new MailCraft(process.env.MAILCRAFT_API_KEY!);
 *
 * await mailcraft.emails.send({
 *   from: 'hello@yourdomain.com',
 *   to: ['person@example.com'],
 *   subject: 'Welcome!',
 *   html: '<p>Thanks for signing up.</p>',
 * });
 * ```
 */
export class MailCraft {
    readonly emails: EmailsResource;
    readonly domains: DomainsResource;
    readonly senders: SendersResource;
    readonly contacts: ContactsResource;
    readonly lists: ListsResource;
    readonly segments: SegmentsResource;
    readonly properties: PropertiesResource;
    readonly templates: TemplatesResource;
    readonly templateFolders: TemplateFoldersResource;
    readonly campaigns: CampaignsResource;
    readonly webhooks: WebhooksResource;
    readonly suppressions: SuppressionsResource;
    readonly metrics: MetricsResource;

    constructor(apiKey: string, options?: ClientOptions) {
        const client = new HttpClient(apiKey, options);

        this.emails = new EmailsResource(client);
        this.domains = new DomainsResource(client);
        this.senders = new SendersResource(client);
        this.contacts = new ContactsResource(client);
        this.lists = new ListsResource(client);
        this.segments = new SegmentsResource(client);
        this.properties = new PropertiesResource(client);
        this.templates = new TemplatesResource(client);
        this.templateFolders = new TemplateFoldersResource(client);
        this.campaigns = new CampaignsResource(client);
        this.webhooks = new WebhooksResource(client);
        this.suppressions = new SuppressionsResource(client);
        this.metrics = new MetricsResource(client);
    }
}

export default MailCraft;
