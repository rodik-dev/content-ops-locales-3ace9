import stackbitConfig from 'stackbit.config';
import { allContent } from './local-content';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

export enum SourceMode {
    CONTENTFUL,
    LOCAL
}

export const sourceMode: SourceMode =
    stackbitConfig.contentSources?.[0].getContentSourceType() === 'contentful'
        ? SourceMode.CONTENTFUL
        : SourceMode.LOCAL;

export async function getContent() {
    switch (sourceMode) {
        case SourceMode.CONTENTFUL:
            return await sourcebitDataClient.getData();
        case SourceMode.LOCAL:
            return allContent();
    }
}

export async function initContent() {
    console.log('Source mode is:', SourceMode[sourceMode]);
}
