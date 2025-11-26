import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import FacebookPixel from "./components/FacebookPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://galileocapital.io"),
  title: {
    default: "Galileo — Fintech en Costa Rica | Tu dinero, más fácil y moderno",
    template: "%s | Galileo",
  },
  description:
    "Controlá todo tu dinero y activos digitales desde un solo lugar de forma fácil, segura y siempre a tu alcance.",
  keywords: [
    "fintech",
    "Costa Rica",
    "activos digitales",
    "cripto",
    "colones",
    "dólares",
    "cuentas multidivisa",
    "transferencias",
    "pagos",
    "cobros",
    "ahorros",
    "tarjeta",
    "negocios",
    "turistas",
    "billetera digital",
  ],
  authors: [{ name: "Galileo" }],
  creator: "Galileo",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://galileocapital.io/",
    title: "Galileo — Fintech en Costa Rica | Tu dinero, más fácil y moderno",
    description:
      "Controlá todo tu dinero y activos digitales desde un solo lugar de forma fácil, segura y siempre a tu alcance.",
    siteName: "Galileo",
    locale: "es_CR",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        type: "image/png",
        alt: "Galileo - Fintech en Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galileo — Fintech en Costa Rica | Tu dinero, más fácil y moderno",
    description:
      "Controlá todo tu dinero y activos digitales desde un solo lugar de forma fácil, segura y siempre a tu alcance.",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  applicationName: "Galileo",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CR">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4SXPP4SBGK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4SXPP4SBGK');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Galileo",
            "url": "https://galileocapital.io/",
            "logo": "https://galileocapital.io/android-chrome-512x512.png",
            "sameAs": [
              "https://www.instagram.com/galileo.capital/"
            ],
            "areaServed": "CR",
            "foundingDate": "2024",
            "foundingLocation": "Costa Rica",
            "contactPoint": [{
              "@type": "ContactPoint",
              "contactType": "customer support",
              "availableLanguage": "es"
            }]
          }`,
          }}
        />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        {children}
      </body>
    </html>
  );
}
