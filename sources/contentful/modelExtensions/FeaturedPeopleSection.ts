import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const FeaturedPeopleSection: ModelExtension = {
    name: 'FeaturedPeopleSection',
    label: 'Featured People',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [
        ...commonFields,
        {
            name: 'variant',
            group: 'styles',
            controlType: 'thumbnails',
            options: [
                { label: 'Three column grid', value: 'three-col-grid', thumbnail: 'https://assets.stackbit.com/components/images/default/three-col-grid.png' },
                { label: 'Four column grid', value: 'four-col-grid', thumbnail: 'https://assets.stackbit.com/components/images/default/four-col-grid.png' },
                { label: 'Mixed grid', value: 'mixed-grid', thumbnail: 'https://assets.stackbit.com/components/images/default/mixed-grid.png' }
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
