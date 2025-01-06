import { EmptyState } from "./empty/empty-state";
import { ExamList } from "./list-main/exam-list";
import { PageHeader } from "./header/page-header";
import { StadisticsTabs } from "./dashboard-stadistics/stadistics-tabs";

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

const exams: Exam[] = [
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

// const exams: Exam[] = [];
export const DashboardHome = () => {
  if (!exams.length) {
    return <EmptyState />;
  }

  return (
    <>
      <PageHeader />

      <ExamList exams={exams} />

      <StadisticsTabs />
    </>
  );
};
