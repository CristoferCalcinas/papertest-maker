"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isValid, parseISO } from "date-fns";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExamCardProps {
  id: string;
  question: string;
  correctAnswer: string;
  createdAt: Date | string;
  completionAnswers: string[] | null;
  status?: "pending" | "reviewed" | "archived";
  onToggleAnswer?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: string) => void;
}

const formatDate = (date: Date | string): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return "Fecha de creación no disponible";
    }
    return format(dateObj, "dd/MM/yyyy HH:mm", {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
  } catch (error) {
    return "Fecha de creación no disponible";
  }
};

export function ExamCard({
  id,
  question,
  correctAnswer,
  createdAt,
  completionAnswers,
  status = "pending",
  onToggleAnswer,
  onEdit,
  onDelete,
  onStatusChange,
}: ExamCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const toggleAnswer = () => {
    setIsAnswerVisible(!isAnswerVisible);
    onToggleAnswer?.();
  };

  const statusColors = {
    pending: "bg-yellow-500",
    reviewed: "bg-green-500",
    archived: "bg-gray-500",
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{question}</CardTitle>
        <Badge className={`${statusColors[status]} m-1`}>{status}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4 leading-relaxed" id={`question-${id}`}>
          <span className="text-sm font-medium text-red-500">Resp.</span>
          &nbsp;
          <span className="text-gray-800 dark:text-gray-200">
            {correctAnswer}
          </span>
        </p>
        <AnimatePresence>
          {isAnswerVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!completionAnswers ? (
                <LoadingSpinner />
              ) : (
                <ul className="answer-list">
                  {completionAnswers.map((answer, index) => (
                    <Answer key={index} answer={answer} id={id} />
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex flex-col-reverse justify-between items-center md:flex-row">
        <div className="text-xs text-muted-foreground mt-2 md:mt-0 md:text-sm">
          Creado el&nbsp;
          {formatDate(createdAt)}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAnswer}
            aria-expanded={isAnswerVisible}
            aria-controls={`answer-${id}`}
          >
            {isAnswerVisible ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Ocultar respuesta
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Mostrar respuesta
              </>
            )}
          </Button>
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              aria-label="Editar pregunta"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              aria-label="Eliminar pregunta"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
    <span className="ml-3">Cargando respuestas...</span>
  </div>
);

const Answer = ({ answer, id }: { answer: string; id: string }) => (
  <li
    className="text-md text-muted-foreground flex flex-col line-clamp-1"
    id={`answer-${id}`}
  >
    <strong>Respuesta: {answer}</strong>
  </li>
);
