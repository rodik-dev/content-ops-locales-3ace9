import { ModelExtension } from '@stackbit/types';

export const Badge: ModelExtension = {
    name: 'Badge',
    label: 'Badge',
    fieldGroups: [{ name: 'styles', label: 'Styles', icon: 'palette' }],
    fields: [
        {
            name: 'color',
            group: 'styles',
            controlType: 'palette',
            options: [
                { label: 'Dark', value: 'text-dark', textColor: '$dark', backgroundColor: '$dark', borderColor: '#ececec' },
                { label: 'Light', value: 'text-light', textColor: '$light', backgroundColor: '$light', borderColor: '#ececec' },
                { label: 'Neutral', value: 'text-neutral', textColor: '$neutral', backgroundColor: '$neutral', borderColor: '#ececec' },
                { label: 'Primary', value: 'text-primary', textColor: '$primary', backgroundColor: '$primary', borderColor: '#ececec' }
            ]
        },
        {
            type: 'style',
            name: 'styles',
            styles: {
                self: {
                    fontStyle: '*',
                    fontWeight: ['400', '500', '700'],
                    textDecoration: '*',
                    textAlign: '*'
                }
            }
        }
    ]
};
