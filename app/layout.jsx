import './globals.css';
import GoogleAnalytics from './google-analytics';
import PwaRegister from './pwa-register';

export const metadata = {
  title: 'Dopa Drill',
  description: 'Bài luyện toán tương tác cho lớp 1–6.',
  applicationName: 'Dopa Drill',
  manifest: '/manifest.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#3b6bff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <GoogleAnalytics />
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
