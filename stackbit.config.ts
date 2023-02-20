import { defineStackbitConfig } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { allModelExtensions } from './sources/contentful/modelExtensions';

// Array of localized model names
const LOCALIZED_MODELS = ['PostLayout', 'PostFeedLayout'];

// Array of available locales
const LOCALES = ['en-US', 'es'];

// Default locale
const DEFAULT_LOCALE = 'en-US';

// Returns the appropriate locale string for the document
const getDocumentLocale = (document) => {
    if (document.fields?.locale) {
        return LOCALES.includes(document.fields?.locale?.value) ? document.fields?.locale.value : null;
    }

    if (document.fields?.slug) {
        return LOCALES.find((locale) => document.fields.slug?.value?.startsWith(locale));
    }

    return null;
};

class LocalizedContentfulContentSource extends ContentfulContentSource {
    async createDocument(options) {
        if (LOCALIZED_MODELS.includes(options.model.name)) {
            const localeField = options.model.fields.find((field) => field.name === 'locale');
            if (localeField) {
                options.updateOperationFields.locale = { type: 'enum', value: options.locale };
            }

            /* Allow to create page without locale in slug for default language */
            /*
            const slugField = options.model.fields.find((field) => field.name === 'slug');
            if (slugField) {
                if (options.updateOperationFields?.slug && !options.updateOperationFields?.slug?.value.startsWith(options.locale)) {
                    throw new Error(`slug '${options.updateOperationFields?.slug?.value}' must start with locale '${options.locale}'`);
                }
            }
            */
        }
        return super.createDocument(options);
    }
}

const contentfulSource = new LocalizedContentfulContentSource({
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

const config = defineStackbitConfig({
    stackbitVersion: '~0.5.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    contentSources: [contentfulSource],
    modelExtensions: allModelExtensions,
    styleObjectModelName: 'ThemeStyle',
    presetReferenceBehavior: 'duplicateContents',
    customContentReload: true,
    // Only needed for duplicate-able projects with content provisioning
    import: {
        type: 'contentful',
        contentFile: 'sources/contentful/import/export.json',
        uploadAssets: true,
        assetsDirectory: 'sources/contentful/import',
        spaceIdEnvVar: 'CONTENTFUL_SPACE_ID',
        deliveryTokenEnvVar: 'CONTENTFUL_DELIVERY_TOKEN',
        previewTokenEnvVar: 'CONTENTFUL_PREVIEW_TOKEN',
        accessTokenEnvVar: 'CONTENTFUL_MANAGEMENT_TOKEN'
    },
    sidebarButtons: [
        {
            label: 'Analytics',
            type: 'link',
            icon: 'analytics',
            url: '/analytics'
        }
    ],
    mapModels({ models }) {
        return models.map((model) => {
            if (LOCALIZED_MODELS.includes(model.name)) {
                return {
                    ...model,
                    localized: true
                };
            }
            return model;
        });
    },

    mapDocuments({ documents }) {
        return documents.map((document) => {
            if (LOCALIZED_MODELS.includes(document.modelName)) {
                const locale = getDocumentLocale(document);
                return {
                    ...document,
                    locale
                };
            }
            return document;
        });
    },

    siteMap({ documents }) {
        return [
            ...LOCALES.map((locale) => {
                return locale !== DEFAULT_LOCALE
                    ? {
                        label: locale,
                        urlPath: `/${locale}`,
                        stableId: locale,
                        locale: locale
                    }
                    : null;
            }),
            ...documents.map((document) => {
                switch (document.modelName) {
                    //                 case 'PostFeedLayout':
                    //                     return ...
                    //                 case 'PostLayout':
                    // return ...
                    case 'PageLayout':
                        return {
                            urlPath: document.fields.slug.value,
                            label: document.fields.title.value,
                            stableId: document.srcObjectId,
                            locale: ''
                        }
                }
            })
        ];
    }
});
export default config;
