export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { ExamForm } from "@/exams/form/exam-form";
import { ExamFormDivider } from "@/exams/form/exam-form-divider";
import { ExamPreview } from "@/exams/preview/exam-preview";
import { prisma } from "@/prisma";

export const metadata: Metadata = {
  title: "Crear Nuevo Examen | PaperTest Maker",
  description:
    "Crea y personaliza exámenes de manera fácil y rápida. Herramienta para profesores y educadores.",
  keywords: "crear examen, exámenes online, herramienta educativa",
};

export default async function CreateExamPage({
  params,
  searchParams,
}: {
  params: { action: string };
  searchParams: { examId?: string };
}) {
  const { action } = await params;
  const { examId } = await searchParams;

  // Validar que la acción sea válida
  if (action !== "create" && action !== "edit") {
    redirect("/"); // o redirect('/error')
  }

  // // Validar que exista examId cuando la acción es edit
  if (action === "edit" && !examId) {
    redirect("/");
  }

  // // Si la acción es create y hay un examId, redirigir
  if (action === "create" && !examId) {
    redirect("/");
  }

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: {
      id: true,
      title: true,
      answersCount: true,
    },
  });

  if (!exam) {
    redirect("/");
  }

  return (
    <main>
      <section
        className="bg-white py-8 sm:py-12"
        role="region"
        aria-label="Formulario de creación de examen"
      >
        <div className="mx-auto max-w-7xl px-2 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <article className="lg:pr-4 w-full h-full order-last lg:order-first">
              <ExamPreview />
            </article>
            <div className="block w-full lg:relative order-first lg:order-last">
              <div className="hidden lg:h-[600px]" />

              <article className="lg:fixed lg:top-1/2 lg:-translate-y-1/2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="text-base/7 text-gray-700">
                  <h1 className="text-base/7 font-semibold text-[#1E3A8A] text-right pr-1 italic">
                    {exam.title}
                  </h1>

                  <div className="w-full">
                    <ExamForm answersCount={exam.answersCount} id={exam.id} />
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