import './globals.css';
import FestivalEffects from '../components/FestivalEffects';

export const metadata = {
  title: 'ODCS — Open Digital Continuity Standard (ODCS-2.0.0)',
  description: 'Official Web Portal for the Open Digital Continuity Standard (ODCS-2.0.0). Built & Maintained by Anirudha Puthraya. Powered by Star Language & Haven Language.',
  keywords: ['ODCS', 'Digital Continuity', 'Star Language', 'Haven Language', 'Offline-First', 'CRDT', 'Zero Intent Loss', 'WebAssembly', '3D Model', 'ODA Algorithm'],
  authors: [{ name: 'Anirudha Puthraya' }],
  creator: 'Anirudha Puthraya',
  publisher: 'ODCS Foundation',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#030712',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="festival">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {/* Service Worker Registration for 100% Offline Compatibility */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('[ODCS PWA] Service Worker registered with scope:', reg.scope);
                  }).catch(function(err) {
                    console.warn('[ODCS PWA] Service Worker registration failed:', err);
                  });
                });
              }
            `
          }}
        />

        {/* Festival & Celebration Effects (Fireworks, Floating Lanterns, Embers) */}
        <FestivalEffects />

        <div className="glow-bg">
          <div className="glow-orb-1" />
          <div className="glow-orb-2" />
          <div className="glow-orb-3" />
        </div>
        {children}
      </body>
    </html>
  );
}
