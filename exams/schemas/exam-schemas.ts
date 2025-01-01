import { z } from "zod";

export const FormSchema = z.object({
  question: z.string().min(5, {
    message: "La pregunta debe tener al menos 5 caracteres.",
  }),
  correctAnswer: z.string().min(1, {
    message: "La respuesta correcta debe tener al menos 5 caracteres.",
  }),
});

// Tipos inferidos para usar en los componentes
export type FormSchemaType = z.infer<typeof FormSchema>;
