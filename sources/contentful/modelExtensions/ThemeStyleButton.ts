import { ModelExtension } from '@stackbit/types';

export const ThemeStyleButton: ModelExtension = {
    name: 'ThemeStyleButton',
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
        },
        {
            name: 'borderRadius',
            controlType: 'button-group',
            options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'DEFAULT' },
                { label: 'Medium', value: 'lg' },
                { label: 'Large', value: 'xl' },
                { label: 'XLarge', value: 'full' }
            ]
        },
        {
            name: 'shadow',
            controlType: 'button-group',
            options: [
                { label: 'None', value: 'none' },
                { label: 'Mild', value: 'md' },
                { label: 'Float', value: 'xl' }
            ]
        },
        { name: 'horizontalPadding', controlType: 'slider', unit: 'px' },
        { name: 'verticalPadding', controlType: 'slider', unit: 'px' }
    ]
};
