import type { Metadata } from "next";
import Script from "next/script";
import "./theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisitPNG — Land of a Million Journeys | Official Tourism Platform",
  description: "Experience the historic Kokoda Track, Mount Wilhelm summits, Coral Triangle diving in Kimbe Bay, Goroka & Hagen Sing-Sings across 22 provinces, and verified Papua New Guinea hospitality.",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#0D2B27" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VisitPNG" />
      </head>
      <body>
        {children}
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    reg.onupdatefound = function() {
                      var installingWorker = reg.installing;
                      if (installingWorker) {
                        installingWorker.onstatechange = function() {
                          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            installingWorker.postMessage({ action: 'skipWaiting' });
                          }
                        };
                      }
                    };
                  }).catch(function(err) {
                    console.log('SW registration skipped:', err);
                  });
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
