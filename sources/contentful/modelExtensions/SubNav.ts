import { ModelExtension } from '@stackbit/types';

export const SubNav: ModelExtension = {
    type: 'data',
    name: 'SubNav',
    fieldGroups: [{ name: 'styles', label: 'Styles', icon: 'palette' }],
    fields: [
        {
            name: 'labelStyle',
            group: 'styles',
            controlType: 'button-group',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' }
            ]
        }
    ]
};
