import type { Metadata } from "next";
import "./theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZamRoam | Roam Zambia — Experience More",
  description: "Experience the majesty of Victoria Falls, world-class safaris in South Luangwa & Lower Zambezi, traditional ceremonies across 10 provinces, and verified Zambian hospitality.",
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
        <meta name="apple-mobile-web-app-title" content="ZamRoam" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    // Automatically check for updates
                    reg.onupdatefound = function() {
                      var installingWorker = reg.installing;
                      if (installingWorker) {
                        installingWorker.onstatechange = function() {
                          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available, take control
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
