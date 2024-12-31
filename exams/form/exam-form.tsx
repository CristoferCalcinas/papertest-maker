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

import { useExamStore } from "../store/exam-store";
import { resetFormState } from "../helpers/resetFormState";
import { FormSchema, FormSchemaType } from "../schemas/exam-schemas";

import { generateToastMessage } from "../helpers/generateToastMessage";
import { processAnswers } from "../helpers/processAnswers";

export const ExamForm = () => {
  const selectedQuestion = useExamStore((state) => state.selectedQuestion);
  const addExam = useExamStore((state) => state.addExam);
  const updateExam = useExamStore((state) => state.updateExam);
  const clearEditing = useExamStore((state) => state.clearEditing);
  const changeCorrectAnswers = useExamStore(
    (state) => state.changeCorrectAnswers
  );

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
        // Modo edición
        updateExam(selectedQuestion.id, data);
        await processAnswers(
          selectedQuestion.id,
          data.question,
          data.correctAnswer,
          changeCorrectAnswers
        );
      } else {
        // Modo creación
        const examAdded = addExam(data);
        await processAnswers(
          examAdded.id,
          data.question,
          data.correctAnswer,
          changeCorrectAnswers
        );
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
                <Input
                  id="question"
                  placeholder="Ej: ¿Cuál es la capital de Francia?"
                  {...field}
                  aria-required="true"
                  autoFocus
                />
              </FormControl>
              {/* <FormDescription>
                Introduce la pregunta que deseas que aparezca en el examen.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse gap-4 items-end justify-evenly">
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
                    className="lg:min-w-[300px]"
                  />
                </FormControl>
                {/* <FormDescription>
                  Introduce la respuesta correcta de la pregunta.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
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
