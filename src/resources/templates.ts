import type { HttpClient } from '../client.js';
import type {
    ItemResponse,
    ListResponse,
    Template,
    TemplateFolder,
} from '../types.js';

export type TemplateParams = {
    name?: string;
    template_folder_id?: number | null;
    subject?: string;
    html_body?: string | null;
    text_body?: string | null;
    variables?: unknown[];
};

export class TemplatesResource {
    constructor(private readonly client: HttpClient) {}

    create(
        params: TemplateParams & { name: string; subject: string },
    ): Promise<ItemResponse<Template>> {
        return this.client.post('/templates', params);
    }

    list(): Promise<ListResponse<Template>> {
        return this.client.get('/templates');
    }

    get(id: number): Promise<ItemResponse<Template>> {
        return this.client.get(`/templates/${id}`);
    }

    /** Updating a template saves a new version — prior versions stay intact for campaigns/emails that already pinned them. */
    update(
        id: number,
        params: TemplateParams,
    ): Promise<ItemResponse<Template>> {
        return this.client.patch(`/templates/${id}`, params);
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/templates/${id}`);
    }
}

export class TemplateFoldersResource {
    constructor(private readonly client: HttpClient) {}

    create(params: { name: string }): Promise<ItemResponse<TemplateFolder>> {
        return this.client.post('/template-folders', params);
    }

    list(): Promise<ListResponse<TemplateFolder>> {
        return this.client.get('/template-folders');
    }

    delete(id: number): Promise<void> {
        return this.client.delete(`/template-folders/${id}`);
    }
}
