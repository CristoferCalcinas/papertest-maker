import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./image-upload";

export function Details() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  // Observar el valor actual de la imagen
  const currentImage = watch("image");
  const currentDifficulty = watch("difficulty");

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description">Descripción del examen</Label>
        <Textarea
          id="description"
          {...register("description", {
            required: "La descripcion del examen es obligatoria",
          })}
          placeholder="Escribe una descripción del examen"
          autoFocus
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message as string}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="difficulty">Dificultad del examen</Label>
        <Select
          onValueChange={(value) => setValue("difficulty", value)}
          value={currentDifficulty || ""}
          {...register("difficulty", {
            required: "La dificultad es requerida",
          })}
        >
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="Selecciona la dificultad del examen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EASY">Fácil</SelectItem>
            <SelectItem value="MEDIUM">Medio</SelectItem>
            <SelectItem value="HARD">Difícil</SelectItem>
            <SelectItem value="VERY_HARD">Muy difícil</SelectItem>
          </SelectContent>
        </Select>
        {errors.difficulty && (
          <p className="text-red-500 text-sm mt-1">
            {errors.difficulty.message as string}
          </p>
        )}
      </div>
      <div>
        <Label>
          Imagen del examen&nbsp;
          <span className="text-sm text-blue-500">(opcional)</span>
        </Label>
        <ImageUpload
          onUpload={(url) => setValue("image", url)}
          maxSizeInMB={2}
          acceptedFormats={["image/jpeg", "image/png"]}
          className="my-4"
          currentImage={currentImage}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {errors.image.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
