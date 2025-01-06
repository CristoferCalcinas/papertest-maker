"use client";

import Link from "next/link";
import { useState } from "react";

import clsx from "clsx";

import { ExamsCardHeader } from "@/exams/render-exams/exams-card-header";
import { ExamsCard } from "@/exams/render-exams/exams-card";
import type { Exam } from "@/exams/render-exams/types";

interface Props {
  exams: Exam[];
}

export const RenderAllExams = ({ exams: examsParam }: Props) => {
  const [exams, setExams] = useState<Exam[]>(examsParam);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "title" | "questions">("date");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (sortType: "date" | "title" | "questions") => {
    setSortBy(sortType);
    // Implementar lógica de ordenamiento aquí
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implementar lógica de búsqueda aquí
  };

  const handleViewToggle = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ExamsCardHeader
        onSort={handleSort}
        onSearch={handleSearch}
        onViewToggle={handleViewToggle}
        view={view}
      />
      <div
        className={clsx(
          "grid gap-6 mt-8",
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {exams.map((exam) => (
          <Link href={`/exams/edit?examId=${exam.id}`} key={exam.id}>
            <ExamsCard exam={exam} view={view} />
          </Link>
        ))}
      </div>
    </div>
  );
};
