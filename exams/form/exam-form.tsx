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
import { generateAnswers } from "../actions/generate-answers";

const FormSchema = z.object({
  question: z.string().min(5, {
    message: "La pregunta debe tener al menos 5 caracteres.",
  }),
  correctAnswer: z.string().min(5, {
    message: "La respuesta correcta debe tener al menos 5 caracteres.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const ExamForm = () => {
  const selectedQuestion = useExamStore((state) => state.selectedQuestion);
  const addExam = useExamStore((state) => state.addExam);
  const updateExam = useExamStore((state) => state.updateExam);
  const clearEditing = useExamStore((state) => state.clearEditing);

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

    if (selectedQuestion) {
      updateExam(selectedQuestion.id, data);
    } else {
      addExam(data);
    }

    toast({
      title: selectedQuestion ? "Pregunta actualizada" : "Pregunta añadida",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      duration: 1500,
    });

    const resp = await generateAnswers(data.question, data.correctAnswer, 2);
    console.log({ resp });

    form.reset({
      question: "",
      correctAnswer: "",
    });

    clearEditing();
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
