/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import { useContext } from 'react';
import {
    AnalyticsEventsContext,
    AnalyticsReportContext,
    analyticsTagConfigured,
    gaMeasurementId
} from '../context';
import Switch from '../switch';
import styles from './styles.module.css';

/*
TODO
Enable integration
Auto-track components
Send events while in the editor
Real-time events & reports
*/
export const SettingsPage: React.FC<{ reportConfigured: boolean }> = ({ reportConfigured }) => {
    const analyticsEnabled = analyticsTagConfigured; // TODO by user-enabled as well
    const eventsContext = useContext(AnalyticsEventsContext),
        reportContext = useContext(AnalyticsReportContext);

    return (
        <div className={styles.container}>
            <div className={styles.title}>Site Analytics</div>
            <div className={styles.controls}>
                <div className={styles.control}>
                    <span className={styles.controlLabel}>GA Tag ID</span>
                    <span className={classNames(styles.tag, gaMeasurementId ? styles.ok : styles.error)}>
                        {gaMeasurementId || 'Not configured'}
                    </span>
                </div>

                <div className={styles.control}>
                    <span className={styles.controlLabel}>Report API Key (server-side only)</span>
                    <span className={classNames(styles.tag, reportConfigured ? styles.ok : styles.error)}>
                        {reportConfigured ? 'Configured' : 'Not configured'}
                    </span>
                </div>

                <div className={styles.control}>
                    <span className={styles.controlLabel}>Show floating button</span>
                    <Switch
                        disabled={!analyticsTagConfigured}
                        isOn={analyticsTagConfigured && reportContext.buttonEnabled}
                        handleToggle={() => {
                            reportContext.setButtonEnabled(!reportContext.buttonEnabled);
                        }}
                    />
                </div>
            </div>
            <div className={styles.comingSoonContainer}>
                <img src="/analytics/site-analytics-soon.png" alt="coming soon" />
                <span className={styles.comingSoonBadge}>Coming soon!</span>
            </div>
        </div>
    );
};
