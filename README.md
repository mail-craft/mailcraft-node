# @mailcraft/node

Official Node.js / TypeScript SDK for the [MailCraft](https://mailcraft.host) email API — transactional email, SMTP relay, marketing campaigns, automations, and contact management for developers and AI agents.

## Install

```bash
npm install @mailcraft/node
```

## Usage

```ts
import { MailCraft } from '@mailcraft/node';

const mailcraft = new MailCraft(process.env.MAILCRAFT_API_KEY!);

await mailcraft.emails.send({
    from: 'hello@yourdomain.com',
    to: ['person@example.com'],
    subject: 'Welcome!',
    html: '<p>Thanks for signing up.</p>',
});
```

Every resource on the client mirrors a section of the [API reference](https://docs.mailcraft.host/api-reference):

```ts
mailcraft.emails.send(...)
mailcraft.emails.list(...)
mailcraft.emails.get(id)
mailcraft.emails.validate(email)

mailcraft.domains.create(...)
mailcraft.domains.verify(id)

mailcraft.contacts.upsert(...)
mailcraft.contacts.addToLists(id, [listId])
mailcraft.contacts.unsubscribe(id)

mailcraft.campaigns.create(...)
mailcraft.campaigns.send(id)

mailcraft.templates.create(...)
mailcraft.templates.update(id, ...) // saves a new version

mailcraft.metrics.get(...)
mailcraft.metrics.reputation()
```

See [`src/index.ts`](./src/index.ts) for the full list of resources (`domains`, `senders`, `contacts`, `lists`, `segments`, `properties`, `templates`, `templateFolders`, `campaigns`, `webhooks`, `suppressions`, `metrics`).

## Error handling

Every non-2xx response throws a `MailCraftApiError`:

```ts
import { MailCraftApiError } from '@mailcraft/node';

try {
    await mailcraft.emails.send({
        from: 'hello@yourdomain.com',
        to: ['bad@example.com'],
        subject: 'Hi',
    });
} catch (error) {
    if (error instanceof MailCraftApiError) {
        console.error(error.status, error.type, error.message, error.errors);
    }
}
```

## Configuration

```ts
new MailCraft(apiKey, {
    baseUrl: 'https://api.mailcraft.host/v1', // override for self-hosted/test environments
    timeoutMs: 30_000,
});
```

## Requirements

Node.js 18+ (uses the global `fetch`).

## License

MIT
