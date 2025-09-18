import { Geist, Geist_Mono, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Tech / display fonts
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

// Base site URL for canonical/OG links
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CodeARC: All-in-One Developer Platform",
    template: "%s | CodeARC",
  },
  description:
    "Revolutionize your workflow with CodeARC. An all-in-one developer platform for smart snippet management, AI-powered tools, seamless collaboration, and project management.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "CodeARC: All-in-One Developer Platform",
    description:
      "Revolutionize your workflow with CodeARC. An all-in-one developer platform for smart snippet management, AI-powered tools, seamless collaboration, and project management.",
    siteName: "CodeARC",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "CodeARC developer platform preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeARC: All-in-One Developer Platform",
    description:
      "Revolutionize your workflow with CodeARC. An all-in-one developer platform for smart snippet management, AI-powered tools, seamless collaboration, and project management.",
    images: ["/1.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${jetBrains.variable} antialiased bg-black text-white`}
      >
        {/* Organization Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CodeARC",
              url: siteUrl,
              logo: new URL("/next.svg", siteUrl).toString(),
              sameAs: [],
            }),
          }}
        />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
