"use client";

import { useState } from "react";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import { RecentExamItem } from "./recent-exam-item";

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
  tests: Exam[];
}

export const RecentExams = ({ tests }: Props) => {
  const [visibleCards, setVisibleCards] = useState(2);

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, tests.length));
  };

  const handleShowLess = () => {
    setVisibleCards(2);
  };

  const hasMoreCards = visibleCards < tests.length;

  // TODO: usar framer-motion para animar la entrada de los elementos
  return (
    <div>
      <section className="rounded-xl p-0 max-w-3xl mx-auto flex flex-col justify-between items-start xl:p-4">
        <h2 className="text-2xl font-bold tracking-tighter ml-2">
          Tus exámenes
        </h2>

        <ul className="w-full">
          {tests.slice(0, visibleCards).map((test) => (
            <RecentExamItem {...test} key={test.id} />
          ))}
        </ul>

        <div className="mt-6 w-full flex justify-center">
          {hasMoreCards && (
            <button
              onClick={handleShowMore}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black"
              aria-label="Mostrar más exámenes"
            >
              Ver más &nbsp; <FaArrowDownLong />
            </button>
          )}

          <button
            onClick={handleShowLess}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black disabled:opacity-50"
            aria-label="Mostrar más exámenes"
            disabled={visibleCards <= 2}
          >
            Ver menos &nbsp; <FaArrowUpLong />
          </button>
        </div>
      </section>
    </div>
  );
};
