import { ModelExtension } from '@stackbit/types';

export const SubmitButtonFormControl: ModelExtension = {
    name: 'SubmitButtonFormControl',
    fieldGroups: [
        { name: 'styles', label: 'Styles', icon: 'palette' },
        { name: 'settings', label: 'Settings', icon: 'gear' }
    ],
    fields: [
        { name: 'showIcon', group: 'styles' },
        {
            name: 'icon',
            group: 'styles',
            options: [
                { label: 'Arrow down', value: 'arrowDown' },
                { label: 'Arrow left', value: 'arrowLeft' },
                { label: 'Arrow right', value: 'arrowRight' },
                { label: 'Arrow up', value: 'arrowUp' },
                { label: 'Chevron down', value: 'chevronDown' },
                { label: 'Chevron left', value: 'chevronLeft' },
                { label: 'Chevron big left', value: 'chevronBigLeft' },
                { label: 'Chevron right', value: 'chevronRight' },
                { label: 'Chevron big right', value: 'chevronBigRight' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'GitHub', value: 'github' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Mail', value: 'mail' },
                { label: 'Play', value: 'play' },
                { label: 'Reddit', value: 'reddit' },
                { label: 'Send', value: 'send' },
                { label: 'Shopping bag', value: 'shoppingBag' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Vimeo', value: 'vimeo' },
                { label: 'YouTube', value: 'youtube' }
            ]
        },
        {
            name: 'iconPosition',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' }
            ]
        },
        {
            name: 'style',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' }
            ]
        },
        { name: 'elementId', group: 'settings' }
    ]
};
