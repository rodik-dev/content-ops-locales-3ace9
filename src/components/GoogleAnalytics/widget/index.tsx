import { useContext, useState, FC } from 'react';
import { AnalyticsDateRange, AnalyticsEvent, AnalyticsEventCounts, SimpleReportData } from '../types';
import { AnalyticsReportContext, AnalyticsReportContextType } from '../context';
import styles from './styles.module.css';
import * as icons from './icons';
import { SingleMetric, MetricValueType, MetricsContainer } from '../metrics-container';
import Switch from '../switch';
import classNames from 'classnames';

type PageAnalyticsWidgetProps = {
    onDateRangeChange: (value: AnalyticsDateRange) => void;
    onComponentReportToggle: () => void;
    onRefresh: () => void;
};

const dateOptions: Record<AnalyticsDateRange, string> = {
    [AnalyticsDateRange.REALTIME]: 'Real-time',
    [AnalyticsDateRange.YESTERDAY]: 'Yesterday',
    [AnalyticsDateRange.DAYS_AGO_7]: 'Last 7 days',
    [AnalyticsDateRange.DAYS_AGO_30]: 'Last 30 days',
    [AnalyticsDateRange.DAYS_AGO_90]: 'Last 90 days'
};

export const PageAnalyticsWidget: React.FC<PageAnalyticsWidgetProps> = ({
    onDateRangeChange,
    onComponentReportToggle,
    onRefresh
}) => {
    const reportContext = useContext(AnalyticsReportContext);
    const [open, setOpen] = useState(false);

    if (reportContext) {
        const report = reportContext.pageReport();
        return (
            <>
                <button
                    className={styles.button}
                    onClick={(e) => {
                        setOpen(!open);
                    }}
                >
                    <icons.AnalyticsIcon />
                    {open ? <icons.ChevronDownIcon /> : <icons.ChevronUpIcon />}
                </button>
                {open && (
                    <div className={styles.box}>
                        <WidgetHeader
                            ctx={reportContext}
                            onDateRangeChange={onDateRangeChange}
                            refreshWidget={onRefresh}
                            closeWidget={() => setOpen(false)}
                        />
                        <PageMetrics report={report} loading={reportContext.loading} />
                        <div className={styles.boxFooter}>
                            <span>Show component overlay</span>
                            <Switch
                                isOn={reportContext.componentReportEnabled}
                                handleToggle={() => onComponentReportToggle()}
                            />
                        </div>
                    </div>
                )}
                {open && (
                    <div
                        className={styles.darkOverlay}
                        onClick={() => {
                            setOpen(false);
                        }}
                    />
                )}
            </>
        );
    } else {
        return <></>;
    }
};

const PageMetrics: FC<{ report: SimpleReportData; loading: boolean }> = ({ report, loading }) => {
    const noData = !!(loading || report.error);
    const pvs = noData ? null : report.eventCounts[AnalyticsEvent.PAGE_VIEW] || 0;
    const clicks = noData ? null : report.eventCounts[AnalyticsEvent.CLICK] || 0;
    const ctr = noData ? null : pvs ? clicks / pvs : 0;

    const metrics: SingleMetric[] = [
        { type: MetricValueType.NUMBER, label: 'Pageviews', value: pvs },
        { type: MetricValueType.PERCENT, label: 'CTR', value: ctr },
        { type: MetricValueType.BADGE, label: 'Conversion rate', value: 'Coming soon' }
    ];

    return (
        <MetricsContainer
            metrics={metrics}
            loading={loading}
            error={report.error}
            containerClass={styles.boxBody}
        />
    );
};

const WidgetHeader: React.FC<{
    ctx: AnalyticsReportContextType;
    onDateRangeChange: (value: AnalyticsDateRange) => void;
    refreshWidget: () => void;
    closeWidget: () => void;
}> = ({ ctx, onDateRangeChange, refreshWidget, closeWidget }) => {
    return (
        <div className={styles.boxHeader}>
            <span className={styles.boxHeaderTitle}>Page analytics</span>

            <div className={styles.selectWrapper}>
                <select
                    value={ctx.dateRange}
                    onChange={(e) => onDateRangeChange(e.target.value as AnalyticsDateRange)}
                >
                    {Object.entries(dateOptions).map(([id, label]) => {
                        return (
                            <option key={id} value={id}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div style={{ flexGrow: 1, display: 'flex' }}>
                {ctx.dateRange === AnalyticsDateRange.REALTIME && (
                    <button
                        onClick={() => {
                            refreshWidget();
                        }}
                    >
                        <icons.RefreshIcon />
                    </button>
                )}
            </div>

            <button
                onClick={() => {
                    closeWidget();
                }}
            >
                <icons.CloseIcon />
            </button>
        </div>
    );
};
