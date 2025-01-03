import { Session } from "next-auth";
import { UseFormReturn } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExamFormValues } from "../hooks/useExamForm";

interface QuestionSelectProps {
  form: UseFormReturn<ExamFormValues>;
  session: Session | null;
}

export const QuestionSelect = ({ form, session }: QuestionSelectProps) => {
  const isSubscribed = Boolean(session?.user?.subscription);
  const totalQuestions = 9;

  return (
    <Select
      onValueChange={(value) => {
        if (isSubscribed || ["2", "3"].includes(value)) {
          form.setValue("questionsCount", value);
        }
      }}
    >
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecciona el número de preguntas" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: totalQuestions }, (_, i) => {
          const value = (i + 2).toString();
          const isDisabled = !isSubscribed && !["2", "3"].includes(value);

          return (
            <SelectItem key={value} value={value} disabled={isDisabled}>
              <div className="flex items-center justify-between gap-2">
                <span>{value} preguntas</span>
                {isDisabled && (
                  <div className="flex items-center gap-1">
                    <FaLock className="h-3 w-3 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      Pro
                    </Badge>
                  </div>
                )}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
