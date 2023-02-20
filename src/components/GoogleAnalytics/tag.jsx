import Script from 'next/script';
import { useEffect } from 'react';
import { Router } from 'next/router';

const GoogleAnalyticsTag = ({ measurementId, onPageview }) => {
    useEffect(() => {
        if (!onPageview) return;
        Router.events.on('routeChangeComplete', onPageview);
        return () => {
            Router.events.off('routeChangeComplete', onPageview);
        };
    });

    useEffect(() => {
        if (onPageview) onPageview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', { 'transport_type': 'beacon' });
        `}
            </Script>
        </>
    );
};

export default GoogleAnalyticsTag;
