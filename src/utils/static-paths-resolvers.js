import {
    getAllNonFeaturedPostsSorted,
    getLocaleNonFeaturedPostsSorted,
    getAllCategoryPostsSorted,
    generatePagedPathsForPage,
    isPublished
} from './data-utils';

export function resolveStaticPaths({ pages, objects }, locales, defaultLocale) {
    return pages.reduce((paths, page) => {
        if (!process.env.stackbitPreview && page.isDraft) {
            return paths;
        }
        const objectType = page.__metadata?.modelName;
        const pageUrlPath = {
            params: { slug: page.__metadata?.urlPath.split('/').filter(Boolean) },
            locale: page.locale
        };
        if (objectType && StaticPathsResolvers[objectType]) {
            const resolver = StaticPathsResolvers[objectType];
            return paths.concat(resolver(page, objects, locales, defaultLocale));
        }
        return paths.concat(pageUrlPath);
    }, []);
}

const StaticPathsResolvers = {
    PostFeedLayout: (page, objects) => {
        const locale = page.locale;
        let posts = locale
            ? getLocaleNonFeaturedPostsSorted(objects, locale)
            : getAllNonFeaturedPostsSorted(objects);
        if (!process.env.stackbitPreview) {
            posts = posts.filter(isPublished);
        }
        const numOfPostsPerPage = page.numOfPostsPerPage ?? 10;
        return generatePagedPathsForPage(page, posts, numOfPostsPerPage);
    },
    PageLayout: (page, objects, locales, defaultLocale) => {
        return locales.map((locale) => ({
            params: { slug: page.__metadata?.urlPath.split('/').filter(Boolean) },
            locale
        }));
    },
    PostFeedCategoryLayout: (page, objects) => {
        const categoryId = page.__metadata?.id;
        const numOfPostsPerPage = page.numOfPostsPerPage ?? 10;
        let categoryPosts = getAllCategoryPostsSorted(objects, categoryId);
        if (!process.env.stackbitPreview) {
            categoryPosts = categoryPosts.filter(isPublished);
        }
        return generatePagedPathsForPage(page, categoryPosts, numOfPostsPerPage);
    }
};
