import { createContext, useEffect, useState } from 'react';
import GoogleAnalyticsTag from './tag';
import { AnalyticsDateRange, AnalyticsEvent, AnalyticsEventCounts, SimpleReportData } from './types';
import { realtimeEventName, sendGaEvent } from './event-utils';
import { useReportData, getComponentReport, getPageReport } from './report-utils';
import { PageAnalyticsWidget } from './widget';
import { useLocalStorage } from './use-local-storage';

export const isDev = process.env.NODE_ENV === 'development';

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;
export const analyticsTagConfigured = !!gaMeasurementId;

export type AnalyticsEventsContextType = {
    enabledByUser: boolean;
    setEnabledByUser: (value: boolean) => void;
    sendEventsInDev: boolean;
    setSendEventsInDev: (value: boolean) => void;
    trackComponents: boolean;
    setTrackComponents: (value: boolean) => void;
    realtimeEnabled: boolean;
    setRealtimeEnabled: (value: boolean) => void;
    shouldSendComponentEvents: boolean;
    sendComponentEvent: (
        eventType: AnalyticsEvent,
        path: string,
        componentId: string,
        properties?: object
    ) => void;
};

export type AnalyticsReportContextType = {
    buttonEnabled: boolean;
    setButtonEnabled: (value: boolean) => void;
    dateRange?: AnalyticsDateRange;
    componentReportEnabled: boolean;
    loading: boolean;
    pageReport: () => SimpleReportData;
    componentReport: (componentId: string) => SimpleReportData;
};

export const AnalyticsEventsContext = createContext<AnalyticsEventsContextType | null>(null);
export const AnalyticsReportContext = createContext<AnalyticsReportContextType | null>(null);

const storagePrefix = 'sbl_analytics_';

// TODO when reportData arrives, all children are re-rendered. Make it so only relevant component re-render
export function AnalyticsProvider({ children }) {
    /*
    TODO disabling analytics by user/toggling component tracking affects the production build & the rendered DOM.
    To prevent hydration mismatch between what the server rendered and the client, this can't be a
    client-side stored property. Add CMS model to control it.
    */
    const [enabledByUser, setEnabledByUser] = useState(true);
    const [sendEventsInDev, setSendEventsInDev] = useState(true);
    const [trackComponents, setTrackComponents] = useState(true);
    const [realtimeEnabled, setRealtimeEnabled] = useState(true);

    const [buttonEnabled, setButtonEnabled] = useLocalStorage(storagePrefix + 'buttonEnabled', true);
    const [componentReportEnabled, setComponentReportEnabled] = useState(false);
    const [reportDateRange, setReportDateRange] = useLocalStorage(
        storagePrefix + 'reportDateRange',
        AnalyticsDateRange.DAYS_AGO_30
    );

    const reportingEnabled = isDev && analyticsTagConfigured && enabledByUser;

    const [reportData, loadingReportData, resetReportData] = useReportData(
        reportingEnabled && buttonEnabled ? reportDateRange : null
    );

    // Floating button rendering done post-useEffect, as it's based on a locally-stored property
    const [renderButton, setRenderButton] = useState(false);
    useEffect(() => {
        setRenderButton(reportingEnabled && buttonEnabled);
    }, [reportingEnabled, buttonEnabled]);

    if (!analyticsTagConfigured) return children;

    let component = <>{children}</>;

    const shouldSendEvents = analyticsTagConfigured && enabledByUser && (!isDev || sendEventsInDev);
    const shouldSendComponentEvents = shouldSendEvents && trackComponents;

    const eventsContext: AnalyticsEventsContextType = {
        realtimeEnabled,
        setRealtimeEnabled,
        enabledByUser,
        setEnabledByUser,
        sendEventsInDev,
        setSendEventsInDev,
        trackComponents,
        setTrackComponents,
        shouldSendComponentEvents,
        sendComponentEvent(eventType, path, componentId, properties) {
            if (!shouldSendComponentEvents) return;

            properties = { componentId, ...properties };
            sendGaEvent(eventType, properties);
            if (realtimeEnabled) {
                const rtEvent = realtimeEventName(path, eventType, componentId);
                sendGaEvent(rtEvent);
            }
        }
    };

    if (shouldSendEvents) {
        const onPageview = () => {
            if (realtimeEnabled)
                sendGaEvent(realtimeEventName(window.location.pathname, AnalyticsEvent.PAGE_VIEW));
        };
        component = (
            <AnalyticsEventsContext.Provider value={eventsContext}>
                {component}
                <GoogleAnalyticsTag measurementId={gaMeasurementId} onPageview={onPageview} />
            </AnalyticsEventsContext.Provider>
        );
    }

    const reportContext: AnalyticsReportContextType = {
        buttonEnabled,
        setButtonEnabled,
        dateRange: reportDateRange,
        componentReportEnabled: componentReportEnabled,
        loading: loadingReportData,
        componentReport(componentId) {
            return getComponentReport(reportData, componentId);
        },
        pageReport() {
            return getPageReport(reportData);
        }
    };

    component = (
        <AnalyticsReportContext.Provider value={reportContext}>
            <>
                {renderButton && (
                    <PageAnalyticsWidget
                        onDateRangeChange={(value: AnalyticsDateRange) => {
                            resetReportData();
                            setReportDateRange(value);
                        }}
                        onComponentReportToggle={() => {
                            setComponentReportEnabled(!componentReportEnabled);
                        }}
                        onRefresh={() => {
                            resetReportData();
                        }}
                    />
                )}
                {component}
            </>
        </AnalyticsReportContext.Provider>
    );

    return component;
}
