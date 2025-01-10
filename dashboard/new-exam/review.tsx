import { useFormContext } from "react-hook-form";

export function Review() {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tighter underline mb-7">
        Revisión de la información del examen
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Titulo del Examen:</h3>
          <p className="tracking-widest">- {formData.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Grado de dificultad del examen:</h3>
          <p className="tracking-widest">- {formData.grade}</p>
        </div>
        <div>
          <h3 className="font-semibold">Cantidad de respuestas del examen:</h3>
          <p className="tracking-widest">
            - {formData.answersCount}
            <strong className="tracking-tighter pl-1 font-extralight italic">
              respuestas por pregunta.
            </strong>
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            Asignatura del examen (Materia del examen):
          </h3>
          <p className="tracking-widest">- {formData.subject}</p>
        </div>
        <div>
          <h3 className="font-semibold">
            Dificultad del examen (Fácil, Medio, Difícil):
          </h3>
          <p className="tracking-widest">- {formData.difficulty}</p>
        </div>
        <div className="col-span-2">
          <h3 className="font-semibold">
            Descripción del examen (Información adicional):
          </h3>
          <p className="tracking-widest">- {formData.description}</p>
        </div>
        <div className="col-span-2">
          <h3 className="font-semibold">Imagen del examen (Opcional):</h3>
          {formData.image ? (
            <img
              src={formData.image}
              alt="ExamImage"
              className="mt-2 max-w-xs rounded"
            />
          ) : (
            <p className="tracking-widest">- No se ha subido ninguna imagen.</p>
          )}
        </div>
      </div>
    </div>
  );
}
