import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import {
    AnalyticsDateRange,
    AnalyticsEvent,
    AnalyticsReportData,
    NO_DIMENSION,
    SimpleReportData
} from './types';
import { realtimeEventName } from './event-utils';

const emptyReport: SimpleReportData = { eventCounts: {} };
const errorReport: SimpleReportData = { error: true, eventCounts: {} };

export function useReportData(
    dateRange: AnalyticsDateRange | null
): [AnalyticsReportData | null, boolean, () => void] {
    const [data, setData] = useState<AnalyticsReportData | null>(null);
    const [loading, setLoading] = useState(false);

    function reset() {
        setData(null);
        setLoading(false);
    }

    useEffect(() => {
        if (!dateRange || (data && data.dateRange === dateRange)) return;
        setData(null);
        setLoading(true);

        const fetchData = async () => {
            const path = window.location.pathname;
            try {
                const requestParams = {
                    dateRange,
                    path
                };
                const response = await fetch('/api/analyticsReport?' + new URLSearchParams(requestParams));
                if (response.status != 200) throw new Error(`Got status ${response.status} ${response.text}`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error('Failed to fetch analytics data');
                setData({ dateRange, path, events: {}, error: true });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [data, dateRange]);

    useEffect(() => {
        if (!dateRange) return;

        Router.events.on('routeChangeComplete', reset);
        return () => {
            Router.events.off('routeChangeComplete', reset);
        };
    });

    return [data, loading, reset];
}

export function getComponentReport(reportData: AnalyticsReportData, componentId: string): SimpleReportData {
    if (!reportData) return emptyReport;
    if (reportData.error) return errorReport;
    const currentPath = window.location.pathname;
    if (reportData.path != currentPath) return emptyReport;

    let result: SimpleReportData = { eventCounts: {} };

    if (reportData.dateRange == AnalyticsDateRange.REALTIME) {
        [AnalyticsEvent.IMPRESSION, AnalyticsEvent.CLICK].forEach((ev) => {
            const eventName = realtimeEventName(currentPath, ev, componentId);
            const values = reportData.events[eventName];
            result.eventCounts[ev] = values as number;
        });
    } else {
        // Use GA's pageview count as upper-bound for impressions -
        // as it seems to discard/not send some page_view in cases custom events (imp, realtime events) are sent
        // TODO: better identify these cases
        const gaPageviews = reportData.events[AnalyticsEvent.PAGE_VIEW]?.[NO_DIMENSION] as number;

        [AnalyticsEvent.IMPRESSION, AnalyticsEvent.CLICK].forEach((ev) => {
            const count = reportData.events[ev]?.[componentId] || 0;
            result.eventCounts[ev] = ev === AnalyticsEvent.IMPRESSION ? Math.min(gaPageviews, count) : count;
        });
    }
    return result;
}

export function getPageReport(reportData: AnalyticsReportData): SimpleReportData {
    if (!reportData) return emptyReport;
    if (reportData.error) return errorReport;
    const currentPath = window.location.pathname;
    if (reportData.path != currentPath) return emptyReport;

    let result: SimpleReportData = { eventCounts: {} };
    let pageviews = 0;
    let totalClicks = 0;

    if (reportData.dateRange == AnalyticsDateRange.REALTIME) {
        const pageviewEventName = realtimeEventName(currentPath, AnalyticsEvent.PAGE_VIEW);
        const clickEventPrefix = realtimeEventName(currentPath, AnalyticsEvent.CLICK);

        pageviews = reportData.events[pageviewEventName] as number;
        Object.entries(reportData.events).forEach(([k, v]) => {
            if (k.startsWith(clickEventPrefix)) {
                totalClicks += v as number;
            }
        });
    } else {
        pageviews = reportData.events[AnalyticsEvent.PAGE_VIEW]?.[NO_DIMENSION] as number;
        const componentClicks = reportData.events[AnalyticsEvent.CLICK] || {};
        Object.entries(componentClicks).forEach(([k, v]) => {
            if (k !== NO_DIMENSION) {
                totalClicks += v;
            }
        });
    }

    result.eventCounts[AnalyticsEvent.PAGE_VIEW] = pageviews;
    result.eventCounts[AnalyticsEvent.CLICK] = totalClicks;
    return result;
}
