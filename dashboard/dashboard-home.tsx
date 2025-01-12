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

interface Props {
  exams: Exam[];
}

export const DashboardHome = ({ exams }: Props) => {
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
