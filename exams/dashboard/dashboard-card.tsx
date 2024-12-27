import { DashboardItemCard } from "./dashboard-item-card";

const exams = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    createdAt: "Jan 2, 2024",
    description: "Literature analysis and comprehension examination",
    grade: "Grade 12 Literature",
    lastModifiedAt: "Jan 16, 2024",
    questions: "35",
    subject: "English",
    title: "Literature Review",
    id: "5",
  },
];

export const DashBoardCard = () => {
  return (
    <section aria-label="Lista de exámenes" className="max-w-3xl mx-auto">
      <ul className="space-y-6 xl:col-span-3">
        {exams.map((exam) => (
          <DashboardItemCard key={exam.id} {...exam} />
        ))}
      </ul>
    </section>
  );
};
