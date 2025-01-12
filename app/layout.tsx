import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PaperTest Maker | Crea Exámenes Online Profesionales",
    template: "%s | PaperTest Maker",
  },
  description:
    "Crea, gestiona y evalúa exámenes online de forma profesional. Herramienta intuitiva para profesores con plantillas personalizables, evaluación automática y análisis detallado de resultados.",
  keywords: [
    "creador de exámenes",
    "exámenes online",
    "evaluación educativa",
    "plataforma educativa",
    "generador de tests",
    "herramientas para profesores",
    "evaluación automática",
    "banco de preguntas",
    "sistema de evaluación",
    "exámenes digitales",
  ],
  authors: [
    {
      name: "Adrian Cristofer Calcinas Ramos",
      url: "https://github.com/CristoferCalcinas",
    },
  ],
  creator: "Adrian Cristofer Calcinas Ramos",
  publisher: "PaperTest Maker",

  metadataBase: new URL("https://papertest.vercel.app"),

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://papertest.vercel.app",
    title: "PaperTest Maker | Plataforma Profesional de Exámenes Online",
    description:
      "Crea exámenes profesionales en minutos. Sistema completo de evaluación para instituciones educativas y profesores.",
    siteName: "PaperTest Maker",
    images: [
      {
        url: "/og/home-og.png",
        width: 1200,
        height: 630,
        alt: "PaperTest Maker - Plataforma Profesional de Exámenes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PaperTest Maker | Exámenes Online Profesionales",
    description:
      "Crea exámenes profesionales en minutos. Evaluación automática y análisis detallado de resultados.",
    images: ["/og/home-og.png"],
    creator: "@calcinas_adrian",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
