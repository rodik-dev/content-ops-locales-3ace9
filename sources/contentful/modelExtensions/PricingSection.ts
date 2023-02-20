import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const PricingSection: ModelExtension = {
    name: 'PricingSection',
    label: 'Pricing',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [
        ...commonFields,
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
