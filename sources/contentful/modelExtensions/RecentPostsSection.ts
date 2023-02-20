import { ModelExtension } from '@stackbit/types';
import { PostFeedSection } from './PostFeedSection';

export const RecentPostsSection: ModelExtension = {
    name: 'RecentPostsSection',
    label: 'Recent Posts',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: PostFeedSection.fieldGroups,
    fields: PostFeedSection.fields
};
