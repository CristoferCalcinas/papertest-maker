import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título del examen</Label>
        <Input
          id="title"
          {...register("title", { required: "El titulo es requerido" })}
          placeholder="Ingrese el titulo"
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message as string}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="grade">Grado</Label>
        <Input
          id="grade"
          {...register("grade", { required: "El grado es requerido" })}
          placeholder="Ingrese el grado"
        />
        {errors.grade && (
          <p className="text-red-500 text-sm mt-1">
            {errors.grade.message as string}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="subject">Materia</Label>
        <Input
          id="subject"
          {...register("subject", {
            required: "El nombre de la asignatura es requerida",
          })}
          placeholder="Ingrese el nombre de la asignatura"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">
            {errors.subject.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
