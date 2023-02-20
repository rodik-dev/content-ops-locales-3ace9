import { ModelExtension } from '@stackbit/types';

export const Footer: ModelExtension = {
    name: 'Footer',
    readOnly: true,
    fieldGroups: [
        { name: 'styles', label: 'Styles', icon: 'palette' },
        { name: 'settings', label: 'Settings', icon: 'gear' }
    ],
    fields: [
        {
            name: 'colors',
            group: 'styles',
            controlType: 'palette',
            options: [
                {
                    label: 'Light background, dark foreground',
                    value: 'bg-light-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$light',
                    borderColor: '#ececec'
                },
                {
                    label: 'Neutral background, dark foreground',
                    value: 'bg-neutral-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$neutral',
                    borderColor: '#ececec'
                },
                { label: 'Dark background, light foreground', value: 'bg-dark-fg-light', textColor: '$light', backgroundColor: '$dark', borderColor: '#ececec' }
            ]
        },
        { type: 'style', name: 'styles', styles: { self: { margin: 'tw0:36', padding: 'tw0:36' } } }
    ]
};
