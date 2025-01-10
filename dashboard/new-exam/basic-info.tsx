import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GRADES_OPTIONS = [
  { id: "FIRST_GRADE", name: "Primero" },
  { id: "SECOND_GRADE", name: "Segundo" },
  { id: "THIRD_GRADE", name: "Tercero" },
  { id: "FOURTH_GRADE", name: "Cuarto" },
  { id: "FIFTH_GRADE", name: "Quinto" },
  { id: "SIXTH_GRADE", name: "Sexto" },
  { id: "SEVENTH_GRADE", name: "Séptimo" },
  { id: "EIGHTH_GRADE", name: "Octavo" },
  { id: "NINTH_GRADE", name: "Noveno" },
  { id: "TENTH_GRADE", name: "Décimo" },
  { id: "ELEVENTH_GRADE", name: "Undécimo" },
  { id: "TWELFTH_GRADE", name: "Duodécimo" },
  { id: "UNIVERSITY", name: "Universidad" },
  { id: "PROFESSIONAL", name: "Profesional" },
  { id: "OTHER", name: "Otro" },
];

export function BasicInfo() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const currentGrade = watch("grade");

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
        <Select
          onValueChange={(value) => setValue("grade", value)}
          value={currentGrade || ""}
          {...register("grade", {
            required: "El grado es requerido",
          })}
        >
          <SelectTrigger id="grade">
            <SelectValue placeholder="Selecciona el grado" />
          </SelectTrigger>
          <SelectContent>
            {GRADES_OPTIONS.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
