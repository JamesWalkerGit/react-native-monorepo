// app/layout.tsx

import { Providers } from "./providers/Providers";
import { StyleSheet } from "../styles/Stylesheet";
import '../styles/global.css';
import { ColorSchemeScript } from "@mantine/core";
import '@mantine/core/styles.css';
import Navbar from "./components/Navbar";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jprojects',
  description: 'Jprojects site collection',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" style={styles.html}>
        <head>
          <ColorSchemeScript />
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
    paddingTop: '7vh'
  }
});