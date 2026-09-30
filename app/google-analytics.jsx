import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';
const VALID_MEASUREMENT_ID = /^G-[A-Z0-9]+$/i;

export default function GoogleAnalytics() {
  if (!VALID_MEASUREMENT_ID.test(GA_MEASUREMENT_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
