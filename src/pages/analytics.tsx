import { GetServerSideProps } from 'next';
import { SettingsPage } from '../components/GoogleAnalytics/settings-page';
import { reportingConfigured } from './api/analyticsReport';
import { isDev } from '../components/GoogleAnalytics/context';

export default function Page({ reportConfigured }) {
    return <SettingsPage reportConfigured={reportConfigured} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!isDev) {
        return { notFound: true };
    } else {
        return {
            props: {
                isDev,
                reportConfigured: reportingConfigured()
            }
        };
    }
};
