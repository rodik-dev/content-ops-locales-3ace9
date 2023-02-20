import { FC, useRef, useEffect, ComponentType, useContext, useState } from 'react';
import { AnalyticsEvent, AnalyticsEventCounts, SimpleReportData } from '../types';
import { AnalyticsEventsContext, AnalyticsReportContext } from '../context';
import styles from './styles.module.css';
import { SingleMetric, MetricValueType, MetricsContainer } from '../metrics-container';

type WithMetadata = {
    __metadata: {
        id: string;
        modelName: string;
    };
};

function getActionTarget(e: EventTarget): string | null {
    let currElement = e as HTMLElement;
    let result = null;
    while (!result && currElement) {
        if (currElement instanceof HTMLAnchorElement) {
            result = currElement.pathname;
        } else if (currElement instanceof HTMLButtonElement && currElement.type === 'submit') {
            result = 'submit';
        }
        currElement = currElement.parentElement;
    }
    return result;
}

export function withAnalytics<T extends WithMetadata>(Component: ComponentType<T>) {
    return function AnalyticsWrapper(props: T) {
        const componentId = props.__metadata?.id;
        const modelName = props.__metadata?.modelName;
        const wrapperRef = useRef();
        const eventsContext = useContext(AnalyticsEventsContext);
        const reportContext = useContext(AnalyticsReportContext);

        const showReport = componentId && reportContext.buttonEnabled && reportContext.componentReportEnabled;
        const sendEvents = componentId && eventsContext.shouldSendComponentEvents;

        let component = <Component {...props} />;

        if (sendEvents) {
            component = (
                <div
                    ref={wrapperRef}
                    onClick={async (e) => {
                        const linkTarget = getActionTarget(e.target);
                        if (linkTarget) {
                            eventsContext.sendComponentEvent(
                                AnalyticsEvent.CLICK,
                                window.location.pathname,
                                componentId,
                                {
                                    linkTarget
                                }
                            );
                        }
                    }}
                >
                    {component}
                </div>
            );
        }

        useEffect(() => {
            if (!sendEvents) return;

            const element = wrapperRef.current;
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        eventsContext.sendComponentEvent(
                            AnalyticsEvent.IMPRESSION,
                            window.location.pathname,
                            componentId
                        );
                        observer.unobserve(element);
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(element);
            return () => {
                observer.unobserve(element);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        if (showReport) {
            const report = reportContext.componentReport(componentId);

            // TODO temp logic for label, instead of getting model friendly name
            let labelWords = modelName.replace('Generic', '').split(/(?=[A-Z])/);
            if (labelWords.length > 1 && labelWords.at(-1) === 'Section')
                labelWords = labelWords.slice(0, -1);
            const label = labelWords.join(' ');

            component = (
                <div className={styles.container}>
                    {component}
                    <div className={styles.background}>
                        <ComponentMetrics label={label} report={report} loading={reportContext.loading} />
                    </div>
                </div>
            );
        }

        return component;
    };
}

const ComponentMetrics: FC<{ label: string; report: SimpleReportData; loading: boolean }> = ({
    label,
    report,
    loading
}) => {
    const noData = !!(loading || report.error);
    const imps = noData ? null : report.eventCounts[AnalyticsEvent.IMPRESSION] || 0;
    const clicks = noData ? null : report.eventCounts[AnalyticsEvent.CLICK] || 0;
    const ctr = noData ? null : imps ? clicks / imps : 0;

    const metrics: SingleMetric[] = [
        { type: MetricValueType.NUMBER, label: 'Impressions', value: imps },
        { type: MetricValueType.NUMBER, label: 'Clicks', value: clicks },
        { type: MetricValueType.PERCENT, label: 'CTR', value: ctr }
    ];

    return (
        <div className={styles.boxAndLabel}>
            <div className={styles.label}>{label}</div>
            <MetricsContainer
                metrics={metrics}
                loading={loading}
                error={report.error}
                containerClass={styles.box}
            />
        </div>
    );
};
