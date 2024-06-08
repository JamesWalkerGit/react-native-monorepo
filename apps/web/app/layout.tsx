import NextAuthProvider from "./providers/next-auth/NextAuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
