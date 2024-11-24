import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:8000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Journey Journal",
  description:
    "Share your adventures and connect with fellow travelers around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  );
}
