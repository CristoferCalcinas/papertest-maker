import clsx from "clsx";

import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step}
            className={clsx(
              "flex items-center",
              index < steps.length - 1 && "w-full"
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0",
                index <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div
              className={clsx(
                "hidden sm:flex w-full bg-gray-200 h-0.5",
                index <= currentStep - 1 && "bg-blue-600"
              )}
            ></div>
            <span className="absolute mt-16 w-max text-center text-xs font-medium text-gray-500">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
