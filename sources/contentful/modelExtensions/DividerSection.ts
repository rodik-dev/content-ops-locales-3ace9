import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const DividerSection: ModelExtension = {
    name: 'DividerSection',
    label: 'Divider',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [...commonFields, { type: 'style', name: 'styles', styles: { self: { margin: 'tw0:96', padding: 'tw0:96' } } }]
};
