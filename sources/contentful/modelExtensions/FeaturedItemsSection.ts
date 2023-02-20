import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const FeaturedItemsSection: ModelExtension = {
    name: 'FeaturedItemsSection',
    label: 'Featured Items',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [
        ...commonFields,
        {
            name: 'variant',
            group: 'styles',
            controlType: 'thumbnails',
            options: [
                { label: 'Two column grid', value: 'two-col-grid', thumbnail: 'https://assets.stackbit.com/components/images/default/two-col-grid.png' },
                { label: 'Three column grid', value: 'three-col-grid', thumbnail: 'https://assets.stackbit.com/components/images/default/three-col-grid.png' },
                { label: 'Small list', value: 'small-list', thumbnail: 'https://assets.stackbit.com/components/images/default/small-list.png' },
                { label: 'Big list', value: 'big-list', thumbnail: 'https://assets.stackbit.com/components/images/default/big-list.png' },
                { label: 'Toggle list', value: 'toggle-list', thumbnail: 'https://assets.stackbit.com/components/images/default/toggle-list.png' }
            ]
        },
        {
            type: 'style',
            name: 'styles',
            styles: {
                self: { margin: 'tw0:96', padding: 'tw0:96', justifyContent: ['flex-start', 'flex-end', 'center'] },
                subtitle: { fontStyle: '*', fontWeight: ['400', '500', '700'], textDecoration: '*', textAlign: '*' }
            }
        }
    ]
};
