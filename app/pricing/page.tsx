import { Metadata } from "next";
import { FaCalendarCheck } from "react-icons/fa";

import clsx from "clsx";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Planes y Precios | PaperTest Maker - Software de Evaluación Educativa",
  description:
    "Encuentra el plan perfecto para tu institución educativa. Desde $29/mes con PaperTest Maker. Gestión de exámenes, análisis en tiempo real y soporte personalizado.",
  keywords: [
    "precios exámenes online",
    "software evaluación educativa",
    "planes educativos",
    "gestión de exámenes",
    "evaluación estudiantes",
    "plataforma educativa",
    "precios PaperTest Maker",
  ],
  openGraph: {
    title: "Planes y Precios | PaperTest Maker",
    description:
      "Software de evaluación educativa desde $29/mes. Gestión de exámenes, análisis en tiempo real y soporte personalizado.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planes y Precios | PaperTest Maker",
    description:
      "Software de evaluación educativa desde $29/mes. Gestión de exámenes, análisis en tiempo real y soporte personalizado.",
  },
  alternates: {
    canonical: "https://papertest.com/pricing",
  },
};

const tiers = [
  {
    name: "Básico",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$29",
    description:
      "Perfecto para educadores que inician su viaje en evaluaciones digitales.",
    features: [
      "Crear hasta 50 exámenes",
      "Capacidad para 100 estudiantes",
      "Análisis y reportes básicos",
      "Preguntas de opción múltiple",
      "Soporte por email en 48 horas",
    ],
    mostPopular: false,
  },
  {
    name: "Profesional",
    id: "tier-professional",
    href: "#",
    priceMonthly: "$79",
    description:
      "Funciones avanzadas para instituciones educativas en crecimiento.",
    features: [
      "Exámenes ilimitados",
      "Capacidad para 500 estudiantes",
      "Panel de análisis avanzado",
      "Todos los tipos de preguntas",
      "Soporte prioritario 24 horas",
      "Calificación automática",
      "Personalización de marca",
    ],
    mostPopular: true,
  },
  {
    name: "Institución",
    id: "tier-institution",
    href: "#",
    priceMonthly: "$199",
    description: "Solución completa para grandes organizaciones educativas.",
    features: [
      "Todo ilimitado",
      "Estudiantes ilimitados",
      "Análisis en tiempo real",
      "Insights impulsados por IA",
      "Soporte dedicado en 1 hora",
      "Integraciones personalizadas",
      "Panel de administración",
      "Importación masiva de estudiantes",
    ],
    mostPopular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base/7 font-semibold text-indigo-600">
            Planes y precios
          </h1>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tighter text-gray-900 sm:text-6xl">
            Precios que crecen contigo
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          Elige el plan perfecto para crear y administrar tus exámenes, dar
          seguimiento al progreso de tus estudiantes y optimizar tu proceso de
          evaluación.
        </p>
        <div className="isolate mx-auto mt-5 grid max-w-md grid-cols-1 gap-y-8 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={clsx(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={clsx(
                      tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                      "text-lg/8 font-semibold"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm/6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-semibold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm/6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <FaCalendarCheck
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-indigo-600"
                      />

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.mostPopular
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                Comenzar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}