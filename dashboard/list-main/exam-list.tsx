"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

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
  const [visibleCards, setVisibleCards] = useState(2);

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
    </section>
  );
};
