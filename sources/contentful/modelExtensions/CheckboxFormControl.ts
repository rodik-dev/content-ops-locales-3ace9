import { ModelExtension } from '@stackbit/types';

export const CheckboxFormControl: ModelExtension = {
    name: 'CheckboxFormControl',
    label: 'CheckboxFormControl',
    fieldGroups: [{ name: 'styles', label: 'Styles', icon: 'palette' }],
    fields: [
        {
            name: 'width',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Full', value: 'full' },
                { label: 'One half', value: '1/2' }
            ]
        }
    ]
};
