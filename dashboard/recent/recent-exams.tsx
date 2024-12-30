"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div>
      <section className="rounded-xl p-0 max-w-3xl mx-auto flex flex-col justify-between items-start xl:p-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold tracking-tighter ml-2"
        >
          Tus exámenes
        </motion.h2>

        <AnimatePresence>
          <ul className="w-full">
            {tests.slice(0, visibleCards).map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <RecentExamItem {...test} />
              </motion.div>
            ))}
          </ul>
        </AnimatePresence>

        <div className="mt-6 w-full flex justify-center">
          {hasMoreCards && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowMore}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black"
              aria-label="Mostrar más exámenes"
            >
              Ver más &nbsp; <FaArrowDownLong />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowLess}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-black disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Mostrar más exámenes"
            disabled={visibleCards <= 2}
          >
            Ver menos &nbsp; <FaArrowUpLong />
          </motion.button>
        </div>
      </section>
    </div>
  );
};
