import { z } from "zod";

// Constantes reutilizables para mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED: "Este campo es requerido",
  EMAIL: {
    INVALID: "El correo electrónico no es válido",
    MIN: "El correo electrónico debe tener al menos 5 caracteres",
  },
  PASSWORD: {
    MIN: "La contraseña debe tener al menos 8 caracteres",
    MAX: "La contraseña debe tener menos de 32 caracteres",
  },
  NAME: {
    MIN: "El nombre debe tener al menos 5 caracteres",
    MAX: "El nombre debe tener menos de 50 caracteres",
  },
  ROLE: {
    MIN: "Debe seleccionar un rol",
  },
} as const;

// Esquemas base reutilizables
const emailSchema = z
  .string({
    required_error: ERROR_MESSAGES.REQUIRED,
  })
  .min(5, ERROR_MESSAGES.EMAIL.MIN)
  .email(ERROR_MESSAGES.EMAIL.INVALID);

const passwordSchema = z
  .string({
    required_error: ERROR_MESSAGES.REQUIRED,
  })
  .min(8, ERROR_MESSAGES.PASSWORD.MIN)
  .max(32, ERROR_MESSAGES.PASSWORD.MAX);

// Esquemas principales
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED,
    })
    .min(5, ERROR_MESSAGES.NAME.MIN)
    .max(50, ERROR_MESSAGES.NAME.MAX),
  email: emailSchema,
  password: passwordSchema,
  role: z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED,
    })
    .min(1, ERROR_MESSAGES.ROLE.MIN),
});

// Tipos inferidos para usar en los componentes
export type SignInSchema = z.infer<typeof signInSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
