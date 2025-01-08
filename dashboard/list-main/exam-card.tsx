"use client";

import Link from "next/link";

import { motion } from "framer-motion";

interface Props {
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

export const ExamCard = ({
  createdAt,
  description,
  grade,
  id,
  imageUrl,
  lastModifiedAt,
  questions,
  subject,
  title,
}: Props) => {
  return (
    <Link href={`/exams/edit?examId=${id}`}>
      <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row items-center cursor-pointer space-y-0 md:space-y-5 md:gap-7"
        layout
      >
        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full h-full sm:w-64 aspect-video"
        >
          <motion.img
            initial={{ filter: "blur(5px)" }}
            animate={{ filter: "blur(0px)" }}
            alt={`Imagen de portada del examen: ${title}`}
            src={imageUrl}
            className="h-full w-full rounded-2xl object-cover"
          />
        </motion.figure>
        <motion.article
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="max-w-xl flex-auto"
        >
          <header>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg/8 font-semibold tracking-tight text-gray-900 flex items-center justify-between gap-2 pr-5"
            >
              <span>{title}</span>
              &nbsp;
              <span className="text-sm text-gray-500">
                Creado:
                {createdAt}
              </span>
            </motion.h2>
            <motion.time
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-500"
              dateTime={lastModifiedAt}
            >
              Última modificación: {lastModifiedAt}
            </motion.time>
          </header>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 max-w-md flex-auto min-w-0"
          >
            <p className="text-base/7 text-gray-600">{grade}</p>
            <p className="text-sm font-semibold tracking-tight text-gray-900">
              <span>{questions} Preguntas</span>
              <span className="mx-2">/</span>
              <span>{subject}</span>
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-base/7 text-gray-600 line-clamp-1"
            >
              {description}
            </motion.p>
          </motion.div>
        </motion.article>
      </motion.li>
    </Link>
  );
};
