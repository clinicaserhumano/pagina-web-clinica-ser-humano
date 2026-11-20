import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/layout/BackToTop";
import CookieBanner from "@/components/layout/CookieBanner";
import HighLevelWidget from "@/components/layout/HighLevelWidget";
import MetaPixel from "@/components/layout/MetaPixel";
import ConversionTracker from "@/components/layout/ConversionTracker";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schemas";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
import { MainContent, PublicOnly } from "@/components/layout/PublicOnly";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.clinicaserhumano.ec"),
  title: {
    default: "Clínica Ser Humano | Recuperar equilibrio también es salud",
    template: "%s | Clínica Ser Humano",
  },
  description:
    "Acompañamos procesos de recuperación y bienestar desde una visión humana, integral y clínicamente precisa en Guayaquil, Ecuador.",
  openGraph: {
    title: "Clínica Ser Humano",
    description: "Acompañamos procesos de recuperación y bienestar desde una visión humana, integral y clínicamente precisa en Guayaquil, Ecuador.",
    url: "https://www.clinicaserhumano.ec",
    siteName: "Clínica Ser Humano",
    locale: "es_EC",
    type: "website",
    images: [{ url: "/og/clinica.jpg", width: 1200, height: 630, alt: "Equipo Clínica Ser Humano" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Ser Humano",
    description: "Acompañamos procesos de recuperación y bienestar desde una visión humana, integral y clínicamente precisa en Guayaquil, Ecuador.",
    images: ["/og/clinica.jpg"],
  },
  alternates: { canonical: "https://www.clinicaserhumano.ec" },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png",  sizes: "57x57" },
      { url: "/apple-icon-60x60.png",  sizes: "60x60" },
      { url: "/apple-icon-72x72.png",  sizes: "72x72" },
      { url: "/apple-icon-76x76.png",  sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      { rel: "manifest", url: "/manifest.json" },
      { rel: "msapplication-config", url: "/browserconfig.xml" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sin headers()/cookies() aquí: así las páginas públicas se generan una sola vez
  // (estáticas). Lo que no debe verse en /admin lo decide <PublicOnly> por la ruta.
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-brand-base text-brand-gray-dark`}>
        {/* Consent Mode v2: debe ejecutarse antes que GTM (todo "denied" hasta que acepten) */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        <PublicOnly>
          <JsonLd data={organizationSchema} />
          <JsonLd data={websiteSchema} />
          <Navbar />
        </PublicOnly>
        <MainContent>{children}</MainContent>
        <PublicOnly>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
          <CookieBanner />
          <HighLevelWidget />
          <MetaPixel />
          <ConversionTracker />
        </PublicOnly>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PVFCTMQ6');`,
          }}
        />
      </body>
    </html>
  );
}
