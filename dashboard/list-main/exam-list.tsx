"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const ExamList = ({ exams }: Props) => {
  const [visibleCards, setVisibleCards] = useState(1);

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + 3, exams.length));
  };

  const handleShowLess = () => {
    setVisibleCards(1);
  };

  const hasMoreCards = visibleCards < exams.length;

  return (
    <section aria-label="Lista de exámenes" className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.ul
          className="space-y-6 xl:col-span-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {exams.slice(0, visibleCards).map((exam) => (
            <ExamCard key={exam.id} {...exam} />
          ))}
        </motion.ul>
      </AnimatePresence>
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
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
          disabled={visibleCards <= 1}
        >
          Ver menos &nbsp; <FaArrowUpLong />
        </motion.button>
      </motion.div>
    </section>
  );
};
