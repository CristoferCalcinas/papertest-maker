"use client";

import { useState } from "react";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

import { DashboardHeaderItemCard } from "./dashboard-header-item-card";

const exams = [
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 15, 2024",
    description:
      "Comprehensive test covering algebraic expressions and equationsComprehensive test covering algebraic expressions and equations",
    grade: "Grade 9 Math",
    lastModifiedAt: "Jan 20, 2024",
    questions: "25",
    subject: "Mathematics",
    title: "Algebra Midterm",
    id: "1",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 10, 2024",
    description:
      "Final assessment of world history from ancient civilizations to modern era",
    grade: "Grade 11 History",
    lastModifiedAt: "Jan 18, 2024",
    questions: "30",
    subject: "History",
    title: "World History Final",
    id: "2",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 5, 2024",
    description: "Laboratory concepts and scientific method evaluation",
    grade: "Grade 10 Science",
    lastModifiedAt: "Jan 12, 2024",
    questions: "22",
    subject: "Biology",
    title: "Lab Concepts Quiz",
    id: "3",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Dec 28, 2023",
    description: "Spanish vocabulary and grammar comprehensive test",
    grade: "Grade 8 Spanish",
    lastModifiedAt: "Jan 8, 2024",
    questions: "40",
    subject: "Spanish",
    title: "Language Assessment",
    id: "4",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 2, 2024",
    description: "Literature analysis and comprehension examination",
    grade: "Grade 12 Literature",
    lastModifiedAt: "Jan 16, 2024",
    questions: "35",
    subject: "English",
    title: "Literature Review",
    id: "5",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Feb 1, 2024",
    description:
      "Advanced calculus concepts including derivatives and integrals",
    grade: "Grade 12 Math",
    lastModifiedAt: "Feb 5, 2024",
    questions: "30",
    subject: "Mathematics",
    title: "Calculus Final Exam",
    id: "6",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 28, 2024",
    description: "Chemical reactions and periodic table comprehensive review",
    grade: "Grade 11 Chemistry",
    lastModifiedAt: "Feb 3, 2024",
    questions: "35",
    subject: "Chemistry",
    title: "Chemical Reactions Test",
    id: "7",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 25, 2024",
    description: "French intermediate level grammar and vocabulary assessment",
    grade: "Grade 10 French",
    lastModifiedAt: "Feb 1, 2024",
    questions: "45",
    subject: "French",
    title: "French Language Assessment",
    id: "8",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 22, 2024",
    description: "Environmental science ecosystem analysis",
    grade: "Grade 11 Science",
    lastModifiedAt: "Jan 29, 2024",
    questions: "28",
    subject: "Environmental Science",
    title: "Ecosystem Analysis Quiz",
    id: "9",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 20, 2024",
    description: "American Civil War and Reconstruction period",
    grade: "Grade 10 History",
    lastModifiedAt: "Jan 27, 2024",
    questions: "32",
    subject: "US History",
    title: "Civil War Assessment",
    id: "10",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 18, 2024",
    description: "Physics mechanics and motion principles test",
    grade: "Grade 12 Physics",
    lastModifiedAt: "Jan 25, 2024",
    questions: "25",
    subject: "Physics",
    title: "Mechanics Midterm",
    id: "11",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 15, 2024",
    description: "Advanced essay writing and composition techniques",
    grade: "Grade 11 English",
    lastModifiedAt: "Jan 22, 2024",
    questions: "20",
    subject: "English",
    title: "Essay Writing Exam",
    id: "12",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 12, 2024",
    description: "Geography and world cultures comprehensive exam",
    grade: "Grade 9 Geography",
    lastModifiedAt: "Jan 19, 2024",
    questions: "40",
    subject: "Geography",
    title: "World Cultures Test",
    id: "13",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 10, 2024",
    description: "Computer science programming fundamentals",
    grade: "Grade 12 CS",
    lastModifiedAt: "Jan 17, 2024",
    questions: "30",
    subject: "Computer Science",
    title: "Programming Basics",
    id: "14",
  },
  {
    imageUrl: "/pila-de-libros.jpg",
    createdAt: "Jan 8, 2024",
    description: "Art history renaissance to modern period",
    grade: "Grade 11 Art",
    lastModifiedAt: "Jan 15, 2024",
    questions: "35",
    subject: "Art History",
    title: "Art Movements Quiz",
    id: "15",
  },
];

export const DashboardHeaderCard = () => {
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
          <DashboardHeaderItemCard key={exam.id} {...exam} />
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