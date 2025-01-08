"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { Stepper } from "./stepper";
import { BasicInfo } from "./basic-info";
import { Details } from "./details";
import { Review } from "./review";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ExamFormData = {
  title: string;
  description: string;
  grade: string;
  subject: string;
  image: string;
  difficulty: string;
  status: "draft" | "published" | "archived";
};

const steps = ["Información Básica", "Detalles", "Revisión"];

export function ExamManagement() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const methods = useForm<ExamFormData>({
    defaultValues: {
      title: "",
      description: "",
      grade: "",
      subject: "",
      image: "",
      difficulty: "",
      status: "draft",
    },
  });

  const onSubmit = async (data: ExamFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitted data:", data);
      setSuccess("¡Examen guardado exitosamente!");
    } catch (err) {
      setError("An error occurred while saving the exam. Please try again.");
    }
  };

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-6"
      >
        <Stepper steps={steps} currentStep={currentStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && <BasicInfo />}
            {currentStep === 1 && <Details />}
            {currentStep === 2 && <Review />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            Anterior
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit">Crear Preguntas</Button>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Alert
                variant="default"
                className="border-green-500 bg-green-50 text-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Éxito</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </FormProvider>
  );
}
