"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const FormSchema = z.object({
  question: z.string().min(5, {
    message: "La pregunta debe tener al menos 5 caracteres.",
  }),
  correctAnswer: z.string().min(5, {
    message: "La respuesta correcta debe tener al menos 5 caracteres.",
  }),
});

export const ExamForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
      correctAnswer: "",
    },
  });

  const addExam = useExamStore((state) => state.addExam);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!form.formState.isValid) return;

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    addExam(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3"
        aria-label="Formulario de creación de pregunta"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pregunta
                <span className="text-red-500">&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="question"
                  placeholder="Ej: ¿Cuál es la capital de Francia?"
                  {...field}
                  aria-required="true"
                />
              </FormControl>
              {/* <FormDescription>
                Introduce la pregunta que deseas que aparezca en el examen.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse gap-4 items-center justify-evenly">
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Respuesta correcta
                  <span className="text-red-500">&nbsp;*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="correctAnswer"
                    placeholder="Ej: París"
                    {...field}
                    aria-required="true"
                  />
                </FormControl>
                {/* <FormDescription>
                  Introduce la respuesta correcta de la pregunta.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isValid}>
            <span>Guardar</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
