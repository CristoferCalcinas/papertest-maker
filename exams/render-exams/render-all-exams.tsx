"use client";

import Link from "next/link";
import { useState } from "react";

import clsx from "clsx";

import { ExamsCardHeader } from "@/exams/render-exams/exams-card-header";
import { ExamsCard } from "@/exams/render-exams/exams-card";
import type { Exam } from "@/exams/render-exams/types";

const MOCK_EXAMS: Exam[] = [
  {
    id: "1",
    title: "Matemáticas Avanzadas",
    createdAt: new Date("2023-01-15"),
    questionCount: 30,
    project: "Ciencias",
    status: "published",
    questions: ["¿Cuál es la derivada de x^2?", "¿Qué es un número complejo?"],
  },
  {
    id: "2",
    title: "Historia Mundial",
    createdAt: new Date("2023-02-20"),
    questionCount: 50,
    project: "Humanidades",
    status: "draft",
    questions: [
      "¿En qué año comenzó la Segunda Guerra Mundial?",
      "¿Quién fue Napoleón Bonaparte?",
    ],
  },
];

export const RenderAllExams = () => {
  const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);
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
