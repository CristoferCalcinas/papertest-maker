import { Session } from "next-auth";
import { UseFormReturn } from "react-hook-form";
import { FaLock } from "react-icons/fa6";

import { ExamFormValues } from "../hooks/useExamForm";
import { QuestionSelect } from "./question-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExamFormContentProps {
  form: UseFormReturn<ExamFormValues>;
  session: Session | null;
}

export const ExamFormContent = ({ form, session }: ExamFormContentProps) => (
  <>
    <DialogHeader>
      <DialogTitle>Crear un Nuevo Examen</DialogTitle>
      <DialogDescription>
        Ingresa los detalles del examen que deseas crear.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="examName" className="text-right">
          Nombre del Examen
        </Label>
        <Input
          id="examName"
          {...form.register("examName")}
          className="col-span-3"
          aria-describedby="examName-error"
        />
        {form.formState.errors.examName && (
          <p
            id="examName-error"
            className="col-start-2 col-span-3 text-sm text-red-500"
          >
            {form.formState.errors.examName.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="questionsCount" className="text-right">
          Número de Preguntas
        </Label>
        <QuestionSelect form={form} session={session} />
        {form.formState.errors.questionsCount && (
          <p
            id="questionsCount-error"
            className="col-start-2 col-span-3 text-sm text-red-500"
          >
            {form.formState.errors.questionsCount.message}
          </p>
        )}
        <DialogDescription className="col-start-2 col-span-3 text-sm text-gray-500">
          {!session?.user?.subscription && (
            <span className="text-xs text-muted-foreground flex items-center gap-3 italic mb-3">
              <FaLock />
              Suscríbete a Pro para acceder a más opciones de preguntas
            </span>
          )}
          <span>Por defecto se crean 2 respuestas.</span>
        </DialogDescription>
      </div>
    </div>
  </>
);
