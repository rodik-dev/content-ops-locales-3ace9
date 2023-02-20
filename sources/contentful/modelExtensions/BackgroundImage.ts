import { ModelExtension } from '@stackbit/types';

export const BackgroundImage: ModelExtension = {
    name: 'BackgroundImage',
    label: 'BackgroundImage',
    fieldGroups: [{ name: 'styles', label: 'Styles', icon: 'palette' }],
    fields: [
        {
            name: 'backgroundSize',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Auto', value: 'auto' },
                { label: 'Cover', value: 'cover' },
                { label: 'Contain', value: 'contain' }
            ]
        },
        {
            name: 'backgroundPosition',
            group: 'styles',
            options: [
                { label: 'Bottom', value: 'bottom' },
                { label: 'Center', value: 'center' },
                { label: 'Left', value: 'left' },
                { label: 'Left bottom', value: 'left-bottom' },
                { label: 'Left top', value: 'left-top' },
                { label: 'Right', value: 'right' },
                { label: 'Right bottom', value: 'right-bottom' },
                { label: 'Right top', value: 'right-top' },
                { label: 'Top', value: 'top' }
            ]
        },
        {
            name: 'backgroundRepeat',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Repeat', value: 'repeat' },
                { label: 'Repeat X', value: 'repeat-x' },
                { label: 'Repeat Y', value: 'repeat-y' },
                { label: 'No repeat', value: 'no-repeat' }
            ]
        },
        { name: 'opacity', group: 'styles', controlType: 'slider', min: 0, max: 100, step: 1, unit: '%' }
    ]
};
