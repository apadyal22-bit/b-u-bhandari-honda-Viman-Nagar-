import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number; // 1 to 4
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { step: 1, label: 'Visit Type' },
  { step: 2, label: 'Rating' },
  { step: 3, label: 'Details' },
  { step: 4, label: 'Review' },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full bg-white px-4 py-3 border-b border-slate-200">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Background connector line */}
          <div className="absolute left-6 right-6 top-4 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          
          {/* Active fill line */}
          <div
            className="absolute left-6 top-4 -translate-y-1/2 h-0.5 bg-red-600 transition-all duration-300 -z-0"
            style={{
              width: `${((Math.min(currentStep, 4) - 1) / (STEPS.length - 1)) * 100}%`,
              maxWidth: 'calc(100% - 3rem)',
            }}
          />

          {STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            const isClickable = onStepClick && s.step < currentStep;

            return (
              <div
                key={s.step}
                className="flex flex-col items-center relative z-10"
              >
                <button
                  id={`btn-step-${s.step}`}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(s.step)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-xs ${
                    isCompleted
                      ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
                      : isCurrent
                      ? 'bg-red-600 text-white ring-4 ring-red-100 scale-105'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                  aria-label={`Step ${s.step}: ${s.label} ${isCurrent ? '(Current)' : isCompleted ? '(Completed)' : ''}`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
                </button>
                <span
                  className={`text-[11px] font-semibold mt-1 tracking-tight transition-colors ${
                    isCurrent
                      ? 'text-red-600 font-bold'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
