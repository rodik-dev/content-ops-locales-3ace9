import { ModelExtension } from '@stackbit/types';
import { PostFeedSection } from './PostFeedSection';

export const FeaturedPostsSection: ModelExtension = {
    name: 'FeaturedPostsSection',
    label: 'Featured Posts',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: PostFeedSection.fieldGroups,
    fields: PostFeedSection.fields
};
