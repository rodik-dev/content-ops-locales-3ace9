import { ModelExtension } from '@stackbit/types';

export const VideoBlock: ModelExtension = {
    name: 'VideoBlock',
    fieldGroups: [
        { name: 'styles', label: 'Styles', icon: 'palette' },
        { name: 'settings', label: 'Settings', icon: 'gear' }
    ],
    fields: [
        {
            name: 'aspectRatio',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: '4:3', value: '4:3' },
                { label: '16:9', value: '16:9' }
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
                    borderWidth: ['0', '1', '2', '4', '8'],
                    borderStyle: '*',
                    borderColor: [
                        { value: 'border-dark', label: 'Dark', color: '$dark' },
                        { value: 'border-light', label: 'Light', color: '$light' },
                        { value: 'border-neutral', label: 'Neutral', color: '$neutral' },
                        { value: 'border-neutralAlt', label: 'Neutral alt', color: '$neutralAlt' },
                        { value: 'border-primary', label: 'Primary', color: '$primary' }
                    ],
                    borderRadius: '*'
                }
            }
        }
    ]
};
