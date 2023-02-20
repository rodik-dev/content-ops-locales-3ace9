import { ModelExtension } from '@stackbit/types';

export const ThemeStyle: ModelExtension = {
    name: 'ThemeStyle',
    type: 'data',
    label: 'Theme Style',
    fieldGroups: [
        { name: 'color-palettes', label: 'Colors', icon: 'fill-drip' },
        { name: 'text-styles', label: 'Text', icon: 'text' },
        { name: 'button-styles', label: 'Buttons', icon: 'palette' }
    ],
    fields: [
        { type: 'color', name: 'light', group: 'color-palettes' },
        { type: 'color', name: 'dark', group: 'color-palettes' },
        { type: 'color', name: 'neutral', group: 'color-palettes' },
        { type: 'color', name: 'neutralAlt', group: 'color-palettes' },
        { type: 'color', name: 'primary', group: 'color-palettes' },
        {
            name: 'fontBody',
            group: 'text-styles',
            options: [
                { label: 'Sans', value: 'sans' },
                { label: 'Serif', value: 'serif' }
            ]
        },
        {
            name: 'fontHeadlines',
            group: 'text-styles',
            options: [
                { label: 'Sans', value: 'sans' },
                { label: 'Serif', value: 'serif' }
            ]
        },
        { name: 'h1', group: 'text-styles', readOnly: true },
        { name: 'h2', group: 'text-styles', readOnly: true },
        { name: 'h3', group: 'text-styles', readOnly: true },
        { name: 'h4', group: 'text-styles', readOnly: true },
        { name: 'h5', group: 'text-styles', readOnly: true },
        { name: 'h6', group: 'text-styles', readOnly: true },
        { name: 'buttonPrimary', group: 'button-styles', readOnly: true },
        { name: 'buttonSecondary', group: 'button-styles', readOnly: true },
        { name: 'linkPrimary', group: 'button-styles', readOnly: true },
        { name: 'linkSecondary', group: 'button-styles', readOnly: true }
    ]
};
