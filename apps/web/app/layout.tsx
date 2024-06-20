// app/layout.tsx

import { Providers } from "./providers/Providers";
import { StyleSheet } from "../styles/Stylesheet";
import '../styles/global.css';
import { ColorSchemeScript } from "@mantine/core";
import '@mantine/core/styles.css';
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta name="description" content="Jprojects site collection" />
      <html lang="en" className='dark' style={styles.html}>
        <head>
          <ColorSchemeScript />
        </head>
        <body style={styles.body}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}


const styles = StyleSheet.create({
  html: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});