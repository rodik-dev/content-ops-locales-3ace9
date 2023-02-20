import { ModelExtension } from '@stackbit/types';

export const TextFormControl: ModelExtension = {
    name: 'TextFormControl',
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
