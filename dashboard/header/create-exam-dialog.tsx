"use client";

import { useSession } from "next-auth/react";
import { UseFormReturn } from "react-hook-form";
import { Session } from "next-auth";

import { z } from "zod";

import { MdAddCircleOutline } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { FaLock } from "react-icons/fa6";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const examFormSchema = z.object({
  examName: z
    .string()
    .min(3, "El nombre del examen debe tener al menos 3 caracteres"),
  questionsCount: z.string().min(1, "Debe seleccionar un número de preguntas"),
});

type ExamFormValues = z.infer<typeof examFormSchema>;

interface QuestionSelectProps {
  form: UseFormReturn<{
    examName: string;
    questionsCount: string;
  }>;
  session: Session | null;
}

export const CreateExamDialog = () => {
  const { data: session } = useSession();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examName: "",
      questionsCount: "2",
    },
  });

  function onSubmit(data: ExamFormValues) {
    console.log({ ...data, questionsCount: parseInt(data.questionsCount) });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:underline" variant="default">
          <span className="hidden md:block tracking-tighter">Crear Examen</span>
          <MdAddCircleOutline className="md:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[485px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <DialogFooter>
            <Button type="submit">
              <FiFileText className="mr-2" />
              Crear Examen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const QuestionSelect = ({ form, session }: QuestionSelectProps) => {
  const isSubscribed = Boolean(session?.user?.subscription);
  const totalQuestions = 9;

  return (
    <Select
      onValueChange={(value) => {
        if (isSubscribed || ["2", "3"].includes(value)) {
          form.setValue("questionsCount", value);
        }
      }}
    >
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona el número de preguntas" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: totalQuestions }, (_, i) => {
          const value = (i + 2).toString();
          const isDisabled = !isSubscribed && !["2", "3"].includes(value);

          return (
            <SelectItem key={value} value={value} disabled={isDisabled}>
              <div className="flex items-center justify-between gap-2">
                <span>{value} preguntas</span>
                {isDisabled && (
                  <div className="flex items-center gap-1">
                    <FaLock className="h-3 w-3 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      Pro
                    </Badge>
                  </div>
                )}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
