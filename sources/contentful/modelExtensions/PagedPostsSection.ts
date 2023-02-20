import { ModelExtension } from '@stackbit/types';
import { PostFeedSection } from './PostFeedSection';

export const PagedPostsSection: ModelExtension = {
    name: 'PagedPostsSection',
    label: 'Paged Post Feed',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: PostFeedSection.fieldGroups,
    fields: [
        ...PostFeedSection.fields,
        { name: 'title', hidden: true, default: null },
        { name: 'subtitle', hidden: true, default: null },
        { name: 'actions', hidden: true, default: [] },
        { name: 'badge', hidden: true, default: null }
    ]
};
