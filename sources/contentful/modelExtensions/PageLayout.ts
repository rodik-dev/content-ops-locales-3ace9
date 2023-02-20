import { ModelExtension } from '@stackbit/types';

export const PageLayout: ModelExtension = {
    name: 'PageLayout',
    type: 'page',
    label: 'Page',
    urlPath: '/{slug}',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: [
        { name: 'settings', label: 'Settings', icon: 'gear' },
        { name: 'seo', label: 'SEO', icon: 'page' }
    ],
    fields: [
        { name: 'isDraft', group: 'settings' },
        { name: 'seo', group: 'seo' }
    ]
};
