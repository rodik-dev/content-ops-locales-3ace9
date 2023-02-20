import { ModelExtension } from '@stackbit/types';
import { commonFields, commonFieldGroups } from './section-common';

export const CarouselSection: ModelExtension = {
    name: 'CarouselSection',
    label: 'Carousel',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    fields: [
        ...commonFields,
        {
            name: 'variant',
            group: 'styles',
            controlType: 'thumbnails',
            options: [
                {
                    label: 'Next/prev navigation',
                    value: 'next-prev-nav',
                    thumbnail: 'https://assets.stackbit.com/components/images/default/carousel-next-prev-nav.png'
                },
                { label: 'Dots navigation', value: 'dots-nav', thumbnail: 'https://assets.stackbit.com/components/images/default/carousel-dots-nav.png' },
                { label: 'Tabs navigation', value: 'tabs-nav', thumbnail: 'https://assets.stackbit.com/components/images/default/carousel-tabs-nav.png' }
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
