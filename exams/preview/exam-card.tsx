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
  status?: "pending" | "reviewed" | "archived";
  onToggleAnswer?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: string) => void;
}

export function ExamCard({
  id,
  question,
  correctAnswer,
  createdAt,
  status = "pending",
  onToggleAnswer,
  onEdit,
  onDelete,
  onStatusChange,
}: ExamCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  // Función mejorada para manejar fechas
  const formatDate = (date: Date | string): string => {
    try {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      if (!isValid(dateObj)) {
        return "Fecha de creación no disponible";
      }
      // Usar una configuración fija para el formato de fecha
      return format(dateObj, "dd/MM/yyyy HH:mm", {
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true,
      });
    } catch (error) {
      return "Fecha de creación no disponible";
    }
  };

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
        <CardTitle className="text-2xl font-bold">Pregunta</CardTitle>
        <Badge className={statusColors[status]}>{status}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4" id={`question-${id}`}>
          {question}
        </p>
        <AnimatePresence>
          {isAnswerVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-md text-muted-foreground" id={`answer-${id}`}>
                <strong>Respuesta:</strong> {correctAnswer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
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
