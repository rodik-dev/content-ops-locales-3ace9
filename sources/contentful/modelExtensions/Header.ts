import { ModelExtension } from '@stackbit/types';

export const Header: ModelExtension = {
    name: 'Header',
    readOnly: true,
    fieldGroups: [
        { name: 'styles', label: 'Styles', icon: 'palette' },
        { name: 'settings', label: 'Settings', icon: 'gear' }
    ],
    fields: [
        {
            name: 'variant',
            group: 'styles',
            controlType: 'thumbnails',
            options: [
                {
                    label: 'Logo and primary links on the left',
                    value: 'logo-left-primary-nav-left',
                    thumbnail: 'https://assets.stackbit.com/components/images/default/logo-left-primary-nav-left.png'
                },
                {
                    label: 'Logo on the left, primary links centered',
                    value: 'logo-left-primary-nav-centered',
                    thumbnail: 'https://assets.stackbit.com/components/images/default/logo-left-primary-nav-centered.png'
                },
                {
                    label: 'Logo on the left, primary links on the right',
                    value: 'logo-left-primary-nav-right',
                    thumbnail: 'https://assets.stackbit.com/components/images/default/logo-left-primary-nav-right.png'
                },
                {
                    label: 'Logo centered, primary links on the left',
                    value: 'logo-centered-primary-nav-left',
                    thumbnail: 'https://assets.stackbit.com/components/images/default/logo-centered-primary-nav-left.png'
                },
                {
                    label: 'Logo and primary links centered',
                    value: 'logo-centered-primary-nav-centered',
                    thumbnail: 'https://assets.stackbit.com/components/images/default/logo-centered-primary-nav-centered.png'
                }
            ]
        },
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
