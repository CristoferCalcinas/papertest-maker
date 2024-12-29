export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Metadata } from "next";

import { ExamForm } from "@/exams/form/exam-form";
import { ExamFormDivider } from "@/exams/form/exam-form-divider";
import { ExamPreview } from "@/exams/preview/exam-preview";

export const metadata: Metadata = {
  title: "Crear Nuevo Examen | PaperTest Maker",
  description:
    "Crea y personaliza exámenes de manera fácil y rápida. Herramienta para profesores y educadores.",
  keywords: "crear examen, exámenes online, herramienta educativa",
};

export default function CreateExamPage() {
  return (
    <main>
      <section
        className="bg-white py-24 sm:py-32"
        role="region"
        aria-label="Formulario de creación de examen"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Columna izquierda: Preview */}
            <article className="lg:pr-4 w-full h-full">
              <ExamPreview />
            </article>

            {/* Columna derecha: Formulario fijo */}
            <div className="relative">
              {/* Este div actúa como placeholder para mantener el espacio */}
              <div className="h-[600px]" />
              {/* Formulario fijo */}
              <article className="fixed top-1/2 w-full max-w-lg -translate-y-1/2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="text-base/7 text-gray-700">
                  <h1 className="text-base/7 font-semibold text-indigo-600">
                    Nombre del Examen ?
                  </h1>

                  <div className="max-w-xl">
                    <ExamForm />
                    <ExamFormDivider />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
