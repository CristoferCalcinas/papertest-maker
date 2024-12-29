import { EmptyState } from "./empty/empty-state";
import { ExamList } from "./list-main/exam-list";
import { PageHeader } from "./header/page-header";
import { RecentExams } from "./recent/recent-exams";

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

// const exams: Exam[] = [];
// const tests: Exam[] = [];
export const DashboardHome = () => {
  if (!exams.length || !tests.length) {
    return <EmptyState />;
  }

  return (
    <>
      <PageHeader />

      <ExamList exams={exams} />

      <RecentExams tests={tests} />
    </>
  );
};
