export type Email = {
    id: string;
    status:
        | 'queued'
        | 'sent'
        | 'delivered'
        | 'delayed'
        | 'bounced'
        | 'complained'
        | 'failed'
        | 'rejected';
    type: 'transactional' | 'campaign' | 'automation';
    from: string;
    to: string[];
    cc: string[] | null;
    bcc: string[] | null;
    reply_to: string | null;
    subject: string;
    tags: Record<string, string> | null;
    message_id: string | null;
    error_message: string | null;
    open_count: number;
    click_count: number;
    sent_at: string | null;
    delivered_at: string | null;
    bounced_at: string | null;
    complained_at: string | null;
    created_at: string;
};

export type SendEmailParams = {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
    cc?: string[];
    bcc?: string[];
    reply_to?: string;
    headers?: Record<string, string>;
    tags?: Record<string, string>;
};

export type EmailValidation = {
    email: string;
    valid: boolean;
    checks: { format: boolean; mx_record: boolean; disposable: boolean };
};

export type DnsRecord = { type: string; host: string; value: string };

export type Domain = {
    id: number;
    name: string;
    region: string;
    status: 'pending' | 'verified_dkim' | 'verified' | 'failed';
    is_default: boolean;
    click_tracking_enabled: boolean;
    open_tracking_enabled: boolean;
    dns_records: DnsRecord[];
    dkim_verified_at: string | null;
    created_at: string;
};

export type Sender = {
    id: number;
    domain_id: number;
    email: string;
    name: string;
    reply_to: string | null;
    is_verified: boolean;
    created_at: string;
};

export type Contact = {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    status: 'subscribed' | 'unsubscribed' | 'pending';
    properties: Record<string, unknown> | null;
    subscribed_at: string | null;
    unsubscribed_at: string | null;
    created_at: string;
};

export type UpsertContactParams = {
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    status?: Contact['status'];
    properties?: Record<string, unknown>;
};

export type MailingList = {
    id: number;
    name: string;
    description: string | null;
    type: 'static' | 'dynamic';
    segment_id: number | null;
    created_at: string;
};

export type SegmentCondition = {
    field: string;
    operator?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains';
    value?: unknown;
};

export type SegmentFilters = {
    operator?: 'and' | 'or';
    conditions?: SegmentCondition[];
};

export type Segment = {
    id: number;
    name: string;
    description: string | null;
    filters: SegmentFilters;
    contact_count: number | null;
    created_at: string;
};

export type Property = {
    id: number;
    key: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'date' | 'list';
    default_value: unknown;
    created_at: string;
};

export type Template = {
    id: number;
    template_folder_id: number | null;
    name: string;
    slug: string;
    subject: string;
    html_body: string | null;
    text_body: string | null;
    variables: unknown[] | null;
    current_version: number;
    created_at: string;
    updated_at: string;
};

export type TemplateFolder = { id: number; name: string; created_at: string };

export type Campaign = {
    id: number;
    name: string;
    subject: string;
    template_id: number;
    sender_id: number;
    list_id: number | null;
    segment_id: number | null;
    status:
        | 'draft'
        | 'scheduled'
        | 'sending'
        | 'sent'
        | 'paused'
        | 'cancelled'
        | 'failed';
    scheduled_at: string | null;
    started_at: string | null;
    completed_at: string | null;
    stats: Record<string, number> | null;
    created_at: string;
};

export type Webhook = {
    id: number;
    url: string;
    description: string | null;
    events: string[];
    is_active: boolean;
    created_at: string;
};

export type Suppression = {
    id: number;
    email: string;
    reason: 'bounced' | 'complained' | 'unsubscribed' | 'manual';
    source: string;
    created_at: string;
};

export type DailyMetrics = {
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    complained: number;
};

export type MetricsResponse = {
    data: DailyMetrics[];
    totals: Omit<DailyMetrics, 'date'>;
    period: { start_date: string; end_date: string };
};

export type Reputation = {
    status: 'good' | 'warning' | 'at_risk';
    bounce_rate: number;
    complaint_rate: number;
    sample_size: number;
    window_days: number;
};

export type ListResponse<T> = { data: T[] };
export type ItemResponse<T> = { data: T };
