// app/layout.tsx

import { Providers } from "./providers/Providers";
import { StyleSheet } from "../styles/Stylesheet";
import '../styles/global.css';
import { ColorSchemeScript } from "@mantine/core";
import '@mantine/core/styles.css';
import Navbar from "./components/Navbar";
import { Metadata } from 'next'
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Jprojects',
  description: 'Jprojects site collection',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" style={styles.html}>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mysc6s9qv1");
          `}
        </Script>
        <head>
          <ColorSchemeScript defaultColorScheme='dark' />
        </head>
        <body style={styles.body}>
          <Providers>
            <Navbar />
            <div style={styles.contentContainer}>
              {children}
            </div>
          </Providers>
        </body>
      </html>
    </>
  );
}


const styles = StyleSheet.create({
  html: {
  },
  body: {
  },
  contentContainer: {
    paddingTop: 56
  }
});