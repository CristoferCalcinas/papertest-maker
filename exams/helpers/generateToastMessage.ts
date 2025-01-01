import { createElement } from "react";
import { FormSchemaType } from "../schemas/exam-schemas";

export const TOAST_DURATION = 1500;

export const generateToastMessage = (
  data: FormSchemaType,
  isEditing: boolean
) => ({
  title: isEditing ? "Pregunta actualizada" : "Pregunta añadida",
  description: createElement(
    "pre",
    { className: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
    createElement(
      "code",
      { className: "text-white" },
      JSON.stringify(data, null, 2)
    )
  ),
  duration: TOAST_DURATION,
});
