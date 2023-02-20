import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const ImageGallerySection: ModelExtension = {
    name: 'ImageGallerySection',
    label: 'Image Gallery',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [
        ...commonFields,
        {
            name: 'motion',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Static', value: 'static' },
                { label: 'Move to left', value: 'move-to-left' },
                { label: 'Move to right', value: 'move-to-right' }
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
