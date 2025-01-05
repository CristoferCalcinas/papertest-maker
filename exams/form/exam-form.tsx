"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useExamStore } from "../store/exam-store";
import { resetFormState } from "../helpers/resetFormState";
import { FormSchema, FormSchemaType } from "../schemas/exam-schemas";

import { generateToastMessage } from "../helpers/generateToastMessage";
import { processAnswers } from "../actions/generate-answers";

interface Props {
  id: string;
  answersCount: number;
}

export const ExamForm = ({ id: idExam, answersCount }: Props) => {
  const {
    addExam,
    updateExam,
    clearEditing,
    changeCorrectAnswers,
    selectedQuestion,
  } = useExamStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
      correctAnswer: "",
    },
    values: selectedQuestion || undefined,
  });

  useEffect(() => {
    if (selectedQuestion) {
      form.reset({
        question: selectedQuestion.question,
        correctAnswer: selectedQuestion.correctAnswer,
      });
    } else {
      form.reset({
        question: "",
        correctAnswer: "",
      });
    }
  }, [selectedQuestion]);

  const handleFormSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (!form.formState.isValid) return;

    toast(generateToastMessage(data, Boolean(selectedQuestion)));

    resetFormState(form);
    clearEditing();

    try {
      if (selectedQuestion) {
        // En el Modo edición no se pueden regenerar las respuestas
        updateExam(selectedQuestion.id, data);
      } else {
        const tempExam = addExam(data);

        const { answers, questionId } = await processAnswers(
          data.question,
          data.correctAnswer,
          answersCount,
          idExam
        );

        changeCorrectAnswers(tempExam.id, answers, questionId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al procesar la pregunta",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleCancel = (): void => {
    form.reset({
      question: "",
      correctAnswer: "",
    });
    clearEditing();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full space-y-3"
        aria-label="Formulario de creación de pregunta"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-3">
                Pregunta
                <span className="text-red-500">&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  id="question"
                  placeholder="Ej: ¿Cuál es la capital de Francia?"
                  {...field}
                  aria-required="true"
                  autoFocus
                  rows={3}
                  className="resize-none sm:min-w-[430px]"
                />
              </FormControl>
              {/* <FormDescription>
                Introduce la pregunta que deseas que aparezca en el examen.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row-reverse gap-5 items-end">
          <div className="flex-grow basis-2/3">
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">
                    Respuesta correcta
                    <span className="text-red-500">&nbsp;*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="correctAnswer"
                      placeholder="Ej: París"
                      {...field}
                      aria-required="true"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 basis-1/3">
            <Button
              type="submit"
              disabled={!form.formState.isDirty || !form.formState.isValid}
            >
              {selectedQuestion ? "Actualizar" : "Guardar"}
            </Button>

            {selectedQuestion && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
