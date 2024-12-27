"use client";

import { useState } from "react";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import { DashboardMainItemsCard } from "./dashboard-main-items-card";

const tests = [
  {
    imageUrl: "/math.jpg",
    createdAt: "Feb 1, 2024",
    description: "Algebra and calculus fundamentals",
    grade: "Grade 12 Math",
    lastModifiedAt: "Feb 15, 2024",
    questions: "40",
    subject: "Mathematics",
    title: "Advanced Mathematics Quiz",
    id: "1",
  },
  {
    imageUrl: "/physics.jpg",
    createdAt: "Feb 3, 2024",
    description: "Mechanics and thermodynamics",
    grade: "Grade 11 Physics",
    lastModifiedAt: "Feb 16, 2024",
    questions: "30",
    subject: "Physics",
    title: "Classical Mechanics Test",
    id: "2",
  },
  {
    imageUrl: "/chemistry.jpg",
    createdAt: "Feb 5, 2024",
    description: "Organic chemistry basics",
    grade: "Grade 11 Chemistry",
    lastModifiedAt: "Feb 17, 2024",
    questions: "35",
    subject: "Chemistry",
    title: "Organic Chemistry Exam",
    id: "3",
  },
  {
    imageUrl: "/biology.jpg",
    createdAt: "Feb 7, 2024",
    description: "Cell biology and genetics",
    grade: "Grade 10 Biology",
    lastModifiedAt: "Feb 18, 2024",
    questions: "45",
    subject: "Biology",
    title: "Cell Biology Assessment",
    id: "4",
  },
  {
    imageUrl: "/literature.jpg",
    createdAt: "Feb 9, 2024",
    description: "Shakespeare and modern literature",
    grade: "Grade 12 Literature",
    lastModifiedAt: "Feb 19, 2024",
    questions: "25",
    subject: "Literature",
    title: "World Literature Quiz",
    id: "5",
  },
  {
    imageUrl: "/history.jpg",
    createdAt: "Feb 11, 2024",
    description: "World War II and aftermath",
    grade: "Grade 11 History",
    lastModifiedAt: "Feb 20, 2024",
    questions: "50",
    subject: "History",
    title: "Modern History Test",
    id: "6",
  },
  {
    imageUrl: "/geography.jpg",
    createdAt: "Feb 13, 2024",
    description: "World geography and climate",
    grade: "Grade 10 Geography",
    lastModifiedAt: "Feb 21, 2024",
    questions: "30",
    subject: "Geography",
    title: "Global Geography Quiz",
    id: "7",
  },
  {
    imageUrl: "/computer-science.jpg",
    createdAt: "Feb 15, 2024",
    description: "Programming fundamentals",
    grade: "Grade 12 CS",
    lastModifiedAt: "Feb 22, 2024",
    questions: "40",
    subject: "Computer Science",
    title: "Programming Basics",
    id: "8",
  },
  {
    imageUrl: "/economics.jpg",
    createdAt: "Feb 17, 2024",
    description: "Microeconomics principles",
    grade: "Grade 11 Economics",
    lastModifiedAt: "Feb 23, 2024",
    questions: "35",
    subject: "Economics",
    title: "Economics Fundamentals",
    id: "9",
  },
  {
    imageUrl: "/spanish.jpg",
    createdAt: "Feb 19, 2024",
    description: "Spanish grammar and vocabulary",
    grade: "Grade 10 Spanish",
    lastModifiedAt: "Feb 24, 2024",
    questions: "45",
    subject: "Spanish",
    title: "Spanish Language Test",
    id: "10",
  },
];

export const DashboardMain = () => {
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
            <DashboardMainItemsCard {...test} key={test.id} />
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
