import '../css/main.css';
import { WithNinetailedProvider } from '../utils/ninetailed-helpers';
import { AnalyticsProvider } from '../components/GoogleAnalytics/context';

export default function MyApp({ Component, pageProps }) {
    return (
        <AnalyticsProvider>
            <WithNinetailedProvider>
                <Component {...pageProps} />
            </WithNinetailedProvider>
        </AnalyticsProvider>
    );
}
