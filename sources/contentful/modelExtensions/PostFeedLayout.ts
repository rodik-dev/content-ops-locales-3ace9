import { ModelExtension } from '@stackbit/types';

export const PostFeedLayout: ModelExtension = {
    name: 'PostFeedLayout',
    label: 'Blog',
    type: 'page',
    singleInstance: true,
    urlPath: '/blog',
    fieldGroups: [
        { name: 'settings', label: 'Settings', icon: 'gear' },
        { name: 'seo', label: 'SEO', icon: 'page' }
    ],
    fields: [
        { name: 'postFeed', readOnly: true },
        { name: 'isDraft', group: 'settings' },
        { name: 'seo', group: 'seo' },
        {
            type: 'style',
            name: 'styles',
            styles: { title: { textAlign: '*' } }
        }
    ]
};
