// app/layout.tsx

import { Providers } from "./providers/Providers";
import { StyleSheet } from "../styles/Stylesheet";
import '../styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark' style={styles.html}>
      <body style={styles.body}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


const styles = StyleSheet.create({
  html: {
    flex: 1,
    height: '100%'
  },
  body: {
    flex: 1,
    height: '100%'
  },
});