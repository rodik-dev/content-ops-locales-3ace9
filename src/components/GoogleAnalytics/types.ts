export enum AnalyticsEvent {
    CLICK = 'click',
    IMPRESSION = 'imp',
    PAGE_VIEW = 'page_view'
}

export const REALTIME_EVENT_PREFIX = 'rt';

export enum AnalyticsDateRange {
    REALTIME = 'realtime',
    YESTERDAY = 'yesterday',
    DAYS_AGO_7 = '7daysAgo',
    DAYS_AGO_30 = '30daysAgo',
    DAYS_AGO_90 = '90daysAgo'
}

export const NO_DIMENSION = 'n/a';

export interface AnalyticsReportData {
    dateRange: AnalyticsDateRange;
    path: string;
    events: Record<string, number | Record<string, number>>;
    error?: boolean;
}

export type AnalyticsEventCounts = {
    [key in AnalyticsEvent]?: number;
};

export interface SimpleReportData {
    eventCounts: AnalyticsEventCounts;
    error?: boolean;
}
