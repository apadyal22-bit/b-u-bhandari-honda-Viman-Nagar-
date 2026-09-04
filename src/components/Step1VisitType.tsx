import React from 'react';
import { Bike, Wrench, KeyRound, ArrowRight } from 'lucide-react';
import { VisitType } from '../types';

interface Step1VisitTypeProps {
  selected: VisitType | null;
  onSelect: (type: VisitType) => void;
  onContinue: () => void;
}

interface VisitOption {
  type: VisitType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const VISIT_OPTIONS: VisitOption[] = [
  {
    type: 'purchase',
    title: 'New Vehicle Purchase',
    description: 'Tell us about your new vehicle buying experience.',
    // User instruction: "use only New Vehicle Purchase la bike icon"
    icon: Bike,
  },
  {
    type: 'service',
    title: 'Vehicle Service',
    description: 'Tell us about your service experience.',
    icon: Wrench,
  },
  {
    type: 'delivery',
    title: 'Vehicle Delivery',
    description: 'Tell us about your vehicle delivery experience.',
    icon: KeyRound,
  },
];

export const Step1VisitType: React.FC<Step1VisitTypeProps> = ({
  selected,
  onSelect,
  onContinue,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          What brought you to B.U. Bhandari Honda?
        </h2>
        <p className="text-sm text-slate-600">
          Select your visit type to personalize your review
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {VISIT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.type;

          return (
            <button
              id={`btn-visit-${opt.type}`}
              key={opt.type}
              type="button"
              onClick={() => onSelect(opt.type)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl transition-all duration-200 cursor-pointer border flex items-start gap-4 relative shadow-xs ${
                isSelected
                  ? 'bg-red-50/70 border-red-500 shadow-md ring-2 ring-red-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-base font-bold tracking-tight ${
                      isSelected ? 'text-red-950' : 'text-slate-900'
                    }`}
                  >
                    {opt.title}
                  </h3>
                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue CTA */}
      <div className="pt-2">
        <button
          id="btn-continue-step1"
          type="button"
          disabled={!selected}
          onClick={onContinue}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm ${
            selected
              ? 'bg-red-600 hover:bg-red-700 text-white active:scale-[0.99] cursor-pointer shadow-red-600/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        {!selected && (
          <p className="text-center text-xs text-slate-400 mt-2">
            Please select an option above to continue
          </p>
        )}
      </div>
    </div>
  );
};
