"use client";

import clsx from "clsx";
import { MoreVertical, Eye, Share2, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Exam } from "./types";

interface ExamCardProps {
  exam: Exam;
  view: "grid" | "list";
}

export function ExamsCard({ exam, view }: ExamCardProps) {
  return (
    <Card
      className={clsx(
        "transition-all duration-300 ease-in-out hover:shadow-lg",
        view === "list" && "flex pt-6"
      )}
    >
      <CardHeader className={clsx(view === "list" && "w-1/3")}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{exam.title}</h3>
          <Badge
            variant={exam.status === "published" ? "default" : "secondary"}
          >
            {exam.status}
          </Badge>
        </div>
        {exam.project ? (
          <Badge variant="default" className="mt-2 text-center">
            {exam.project}
          </Badge>
        ) : (
          <Badge variant="outline" className="mt-2">
            Sin proyecto
          </Badge>
        )}
      </CardHeader>
      <CardContent className={clsx(view === "list" && "w-1/3")}>
        <p className="text-sm text-gray-500 mb-2">
          Creado el {exam.createdAt.toLocaleDateString()}
        </p>
        {exam.questionCount > 0 ? (
          <Badge variant="secondary" className="mb-4">
            {exam.questionCount} preguntas
          </Badge>
        ) : (
          <Badge variant="destructive" className="mb-4 w-full">
            Sin preguntas
          </Badge>
        )}

        <div className="text-sm">
          {exam.questions.length > 0 ? (
            <>
              <strong>Primeras preguntas:</strong>

              <ul className="list-disc list-inside mt-2">
                {exam.questions.slice(0, 2).map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </>
          ) : (
            <strong className="mt-2 w-full text-center">
              <p>No hay preguntas</p>
            </strong>
          )}
        </div>
      </CardContent>
      <CardFooter
        className={clsx("flex justify-between", view === "list" && "w-1/3")}
      >
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Vista previa
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
