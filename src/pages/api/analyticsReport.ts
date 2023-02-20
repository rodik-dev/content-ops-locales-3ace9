import type { NextApiRequest, NextApiResponse } from 'next';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import {
    AnalyticsDateRange,
    AnalyticsEvent,
    AnalyticsReportData,
    NO_DIMENSION
} from '../../components/GoogleAnalytics/types';
import { realtimeEventName } from '../../components/GoogleAnalytics/event-utils';

const isDev = process.env.NODE_ENV === 'development';
const propertyId = process.env.GA_PROPERTY_ID;
const credentials = JSON.parse(process.env.GA_CREDENTIALS || null);

const analyticsDataClient =
    isDev && propertyId && credentials
        ? new BetaAnalyticsDataClient({
              credentials
          })
        : null;

export function reportingConfigured() {
    return !!analyticsDataClient;
}

interface Params {
    path: string;
    dateRange: AnalyticsDateRange;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!isDev) {
            res.status(404).send('');
            return;
        } else if (!reportingConfigured()) {
            const message = 'Reporting not configured';
            console.error(message);
            res.status(500).json(message);
            return;
        }

        const path = (req.query?.path as string) || null;
        const dateRange = (req.query?.dateRange as AnalyticsDateRange) || null;

        let result: AnalyticsReportData;
        if (dateRange === AnalyticsDateRange.REALTIME) {
            result = await runRealtimeReport(path);
        } else {
            result = await runHistoricalReport(path, dateRange);
        }
        //console.log('result', JSON.stringify(result, null, 2));
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
}

async function runRealtimeReport(path: string) {
    const eventPrefix = realtimeEventName(path);

    const response = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        dimensions: [
            {
                name: 'eventName'
            }
        ],
        metrics: [
            {
                name: 'eventCount'
            }
        ],
        dimensionFilter: {
            orGroup: {
                expressions: [
                    {
                        filter: {
                            fieldName: 'eventName',
                            stringFilter: {
                                matchType: 'BEGINS_WITH',
                                value: eventPrefix
                            }
                        }
                    }
                ]
            }
        }
    });

    //console.log('response', JSON.stringify(response, null, 2));
    const rows = response[0].rows;
    const events = {};
    rows.forEach((row) => {
        const value = parseInt(row.metricValues[0].value);
        events[row.dimensionValues[0].value] = isNaN(value) ? 0 : value;
    });
    return { path, dateRange: AnalyticsDateRange.REALTIME, events };
}

async function runHistoricalReport(path: string, dateRange: AnalyticsDateRange) {
    // Also fetch count for the "real-time pageview" event, as it might have a higher count than
    // GA's built-in page_view event (probably due to some heurstics on GA side?).
    const realtimePvEvent = realtimeEventName(path, AnalyticsEvent.PAGE_VIEW);

    const response = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: dateRange,
                endDate: 'today'
            }
        ],
        dimensions: [
            {
                name: 'eventName'
            },
            {
                name: 'customEvent:componentId'
            }
        ],
        metrics: [
            {
                name: 'eventCount'
            }
        ],
        dimensionFilter: {
            andGroup: {
                expressions: [
                    {
                        filter: {
                            fieldName: 'eventName',
                            inListFilter: {
                                values: [
                                    AnalyticsEvent.CLICK,
                                    AnalyticsEvent.IMPRESSION,
                                    AnalyticsEvent.PAGE_VIEW,
                                    realtimePvEvent
                                ]
                            }
                        }
                    },
                    {
                        filter: {
                            fieldName: 'pagePath',
                            stringFilter: {
                                matchType: 'EXACT',
                                value: path
                            }
                        }
                    }
                ]
            }
        }
    });

    const events = {};
    response[0].rows.forEach((row) => {
        const eventName = row.dimensionValues[0].value;

        let componentId = row.dimensionValues[1].value;
        if (componentId === '(not set)') componentId = NO_DIMENSION;

        let value = parseInt(row.metricValues[0].value);
        value = isNaN(value) ? 0 : value;

        events[eventName] = { ...events[eventName], [componentId]: value };
    });

    return { path, dateRange, events };
}
