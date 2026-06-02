interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2 px-1">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step <= currentStep;
        return (
          <div key={step} className="flex flex-1 items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                isActive ? "bg-forest" : "bg-gray-200"
              }`}
            />
            {i < totalSteps - 1 && (
              <div
                className={`h-2 w-2 shrink-0 rounded-full ${
                  step < currentStep ? "bg-forest" : step === currentStep ? "bg-forest ring-4 ring-forest/20" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
