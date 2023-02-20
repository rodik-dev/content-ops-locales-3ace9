import { ModelExtension } from '@stackbit/types';

export const PricingPlan: ModelExtension = {
    name: 'PricingPlan',
    fieldGroups: [
        { name: 'cardStyles', label: 'Card styles', icon: 'palette' },
        { name: 'settings', label: 'Settings', icon: 'gear' }
    ],
    fields: [
        {
            name: 'colors',
            group: 'cardStyles',
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
                    label: 'Neutral alt background, dark foreground',
                    value: 'bg-neutralAlt-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$neutralAlt',
                    borderColor: '#ececec'
                },
                { label: 'Dark background, light foreground', value: 'bg-dark-fg-light', textColor: '$light', backgroundColor: '$dark', borderColor: '#ececec' }
            ]
        },
        { name: 'elementId', group: 'settings' },
        {
            type: 'style',
            name: 'styles',
            styles: {
                self: {
                    margin: 'tw0:96',
                    padding: 'tw0:96',
                    flexDirection: '*',
                    justifyContent: ['flex-start', 'flex-end', 'center'],
                    borderWidth: ['0', '1', '2', '4', '8'],
                    borderStyle: '*',
                    borderColor: [
                        { value: 'border-dark', label: 'Dark', color: '$dark' },
                        { value: 'border-light', label: 'Light', color: '$light' },
                        { value: 'border-neutral', label: 'Neutral', color: '$neutral' },
                        { value: 'border-neutralAlt', label: 'Neutral alt', color: '$neutralAlt' },
                        { value: 'border-primary', label: 'Primary', color: '$primary' }
                    ],
                    borderRadius: '*',
                    textAlign: '*'
                }
            }
        }
    ]
};
