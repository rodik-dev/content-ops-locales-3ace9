import * as React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

const loadingValue = '...';
const numberLocale = 'en-US';

export enum MetricValueType {
    NUMBER,
    PERCENT,
    BADGE
}

export type SingleMetric = {
    label: string;
    type: MetricValueType;
    value: number | string;
};

export const MetricsContainer: React.FC<{
    metrics: SingleMetric[];
    loading: boolean;
    error?: boolean;
    containerClass: string;
}> = ({ metrics, loading, error, containerClass }) => {
    return (
        <div className={classNames(styles.metricsContainer, containerClass)}>
            {metrics.map((metric, idx) => {
                const positionStyle =
                    idx == 0
                        ? styles.leftMetric
                        : idx == metrics.length - 1
                        ? styles.rightMetric
                        : styles.midMetric;

                let value = null;
                if (error) {
                    value = (
                        // eslint-disable-next-line @next/next/no-html-link-for-pages
                        <a href="/analytics">
                            <span className={classNames(styles.badgeValue, styles.error)}>Configure</span>
                        </a>
                    );
                } else if (metric.type === MetricValueType.BADGE) {
                    value = <span className={styles.badgeValue}>{metric.value}</span>;
                } else {
                    if (loading) {
                        value = loadingValue;
                    } else if (metric.type === MetricValueType.NUMBER) {
                        value = metric.value.toLocaleString();
                    } else if (metric.type === MetricValueType.PERCENT) {
                        value = ((metric.value as number) * 100).toFixed(1) + '%';
                    }
                }

                return (
                    <div key={metric.label} className={classNames(styles.metric, positionStyle)}>
                        <span className={styles.metricTitle}>{metric.label}</span>
                        <span className={styles.metricValue}>{value}</span>
                    </div>
                );
            })}
        </div>
    );
};
