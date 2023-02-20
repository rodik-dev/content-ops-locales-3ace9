import { FieldExtension, FieldGroupItem } from '@stackbit/types';

export const commonFields: FieldExtension[] = [
    {
        type: 'enum',
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
            {
                label: 'Dark background, light foreground',
                value: 'bg-dark-fg-light',
                textColor: '$light',
                backgroundColor: '$dark',
                borderColor: '#ececec'
            }
        ],
        default: 'bg-light-fg-dark'
    },
    { name: 'backgroundImage', type: 'reference', models: ['BackgroundImage'], group: 'styles' },
    { name: 'elementId', type: 'string', group: 'settings' }
];

export const commonFieldGroups: FieldGroupItem[] = [
    { name: 'styles', label: 'Styles', icon: 'palette' },
    { name: 'settings', label: 'Settings', icon: 'gear' }
];
