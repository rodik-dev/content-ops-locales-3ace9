import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const GenericSection: ModelExtension = {
    name: 'GenericSection',
    label: 'Section',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [
        ...commonFields,
        {
            type: 'style',
            name: 'styles',
            styles: {
                self: {
                    margin: 'tw0:96',
                    padding: 'tw0:96',
                    flexDirection: '*',
                    alignItems: ['flex-start', 'flex-end', 'center'],
                    justifyContent: ['flex-start', 'flex-end', 'center']
                },
                subtitle: { fontStyle: '*', fontWeight: ['400', '500', '700'], textDecoration: '*', textAlign: '*' },
                text: { textAlign: '*' }
            }
        },
        { name: 'locale', hidden: false, localized: false }
    ]
};
