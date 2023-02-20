import { ModelExtension } from '@stackbit/types';

export const ThemeStyleLink: ModelExtension = {
    name: 'ThemeStyleLink',
    readOnly: true,
    fields: [
        {
            name: 'weight',
            controlType: 'button-group',
            options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Medium', value: 'medium' },
                { label: 'Bold', value: 'bold' }
            ]
        },
        {
            name: 'case',
            controlType: 'button-group',
            options: [
                { label: 'Default', value: 'none' },
                { label: 'ag', value: 'lowercase' },
                { label: 'Ag', value: 'capitalize' },
                { label: 'AG', value: 'uppercase' }
            ]
        },
        {
            name: 'letterSpacing',
            controlType: 'button-group',
            options: [
                { label: 'Tighter', value: 'tighter' },
                { label: 'Tight', value: 'tight' },
                { label: 'Normal', value: 'normal' },
                { label: 'Wide', value: 'wide' },
                { label: 'Wider', value: 'wider' }
            ]
        }
    ]
};
