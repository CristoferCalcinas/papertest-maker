import { InputExam } from "@/exams/input-exam";
import { Divider } from "@/exams/divider";
import { RenderExam } from "@/exams/render-exam";

export default function CreateExamPage() {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-4 w-full h-full bg-red-500">
              <RenderExam />
            </div>

            <div>
              <div className="text-base/7 text-gray-700 lg:max-w-lg">
                <h1 className="text-base/7 font-semibold text-indigo-600">
                  Nombre del Examen ?
                </h1>
                
                <div className="max-w-xl">
                  <InputExam />
                  <Divider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
