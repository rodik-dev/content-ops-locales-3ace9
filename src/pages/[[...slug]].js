import React from 'react';
import { getContent } from '../utils/content';
import { getComponent } from '../components/components-registry';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import { hotContentReload } from 'sourcebit-target-next/hot-content-reload';
import { usingSourcebit } from '../utils/using-sourcebit';
import { useRouter } from 'next/router';

function Page(props) {
    const { page, site } = props;
    const { modelName } = page.__metadata;
    if (!modelName) {
        throw new Error(`page has no type, page '${props.path}'`);
    }
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    const router = useRouter();
    React.useEffect(() => {
        window.addEventListener('stackbitLocaleChanged', (event) => {
            const locale = event?.detail?.locale;
            console.log('Locale changed in Stackbit: ', locale);
            if (locale) {
                router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale });
            }
        })
    }, [])

    return <PageLayout page={page} site={site} />;
}

export async function getStaticPaths({ locales, defaultLocale }) {
    const data = await getContent();
    const paths = resolveStaticPaths(data, locales, defaultLocale);
    return { paths, fallback: false };
}

export async function getStaticProps({ params, locale, defaultLocale }) {
    const data = await getContent();
    const urlPath = '/' + (params.slug || []).join('/');
    const props = await resolveStaticProps(urlPath, data, locale, defaultLocale);
    return { props };
}

const withHotContentReload = hotContentReload();
export default usingSourcebit ? withHotContentReload(Page) : Page;
