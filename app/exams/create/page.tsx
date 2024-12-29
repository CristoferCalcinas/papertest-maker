export const dynamic = "force-dynamic";
export const revalidate = 0;

import { InputExam } from "@/exams/input-exam";
import { Divider } from "@/exams/divider";
import { RenderExam } from "@/exams/render-exam";

import { Metadata } from "next";

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
            <article className="lg:pr-4 w-full h-full">
              <RenderExam />
            </article>

            <article>
              <div className="text-base/7 text-gray-700 lg:max-w-lg">
                <h1 className="text-base/7 font-semibold text-indigo-600">
                  Nombre del Examen ?
                </h1>

                <div className="max-w-xl">
                  <InputExam />
                  <Divider />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
