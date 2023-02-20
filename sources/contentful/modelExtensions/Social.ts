import { ModelExtension } from '@stackbit/types';

export const Social: ModelExtension = {
    name: 'Social',
    fieldGroups: [
        { name: 'styles', label: 'Styles', icon: 'palette' },
        { name: 'settings', label: 'Settings', icon: 'gear' }
    ],
    fields: [
        {
            name: 'icon',
            group: 'styles',
            options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'GitHub', value: 'github' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Mail', value: 'mail' },
                { label: 'Reddit', value: 'reddit' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Vimeo', value: 'vimeo' },
                { label: 'YouTube', value: 'youtube' }
            ]
        },
        { name: 'elementId', group: 'settings' }
    ]
};
