"use client";

import { useState } from "react";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import { ExamCard } from "./exam-card";

interface Exam {
  createdAt: string;
  description: string;
  grade: string;
  id: string;
  imageUrl: string;
  lastModifiedAt: string;
  questions: string;
  subject: string;
  title: string;
}

interface Props {
  exams: Exam[];
}

export const ExamList = ({ exams }: Props) => {
  const [visibleCards, setVisibleCards] = useState(1);

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, exams.length));
  };

  const handleShowLess = () => {
    setVisibleCards(1);
  };

  const hasMoreCards = visibleCards < exams.length;

  // TODO: usar framer-motion para animar la entrada de los elementos
  return (
    <section aria-label="Lista de exámenes" className="max-w-3xl mx-auto">
      <ul className="space-y-6 xl:col-span-3">
        {exams.slice(0, visibleCards).map((exam) => (
          <ExamCard key={exam.id} {...exam} />
        ))}
      </ul>

      {hasMoreCards && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowMore}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black"
            aria-label="Mostrar más exámenes"
          >
            Ver más &nbsp; <FaArrowDownLong />
          </button>{" "}
          <button
            onClick={handleShowLess}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black disabled:opacity-50"
            aria-label="Mostrar más exámenes"
            disabled={visibleCards <= 1}
          >
            Ver menos &nbsp; <FaArrowUpLong />
          </button>
        </div>
      )}
    </section>
  );
};
