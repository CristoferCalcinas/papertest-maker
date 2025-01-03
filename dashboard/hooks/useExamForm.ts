import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createExam } from "../actions/dashboard-actions";

export const examFormSchema = z.object({
  examName: z
    .string()
    .min(3, "El nombre del examen debe tener al menos 3 caracteres"),
    answersCount: z.string().min(1, "Debe seleccionar un número de preguntas"),
});

export type ExamFormValues = z.infer<typeof examFormSchema>;

export const useExamForm = () => {
  const router = useRouter();
  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examName: "",
      answersCount: "2",
    },
  });

  const onSubmit = async (data: ExamFormValues) => {
    console.log({ ...data, answersCount: parseInt(data.answersCount) });

    await createExam(data.examName, data.answersCount);
    // router.push("/exams");
  };

  return { form, onSubmit };
};
