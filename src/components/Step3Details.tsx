import React from 'react';
import { ArrowLeft, Sparkles, Check, ThumbsUp, User, Users2, MessageSquare } from 'lucide-react';
import { HIGHLIGHT_OPTIONS } from '../types';

interface Step3DetailsProps {
  highlights: string[];
  employeeName: string;
  teamDepartment: string;
  additionalRemarks: string;
  onToggleHighlight: (highlight: string) => void;
  onChangeEmployeeName: (name: string) => void;
  onChangeTeamDepartment: (dept: string) => void;
  onChangeAdditionalRemarks: (remarks: string) => void;
  onBack: () => void;
  onGenerate: () => void;
}

export const Step3Details: React.FC<Step3DetailsProps> = ({
  highlights,
  employeeName,
  teamDepartment,
  additionalRemarks,
  onToggleHighlight,
  onChangeEmployeeName,
  onChangeTeamDepartment,
  onChangeAdditionalRemarks,
  onBack,
  onGenerate,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Tell us a little more
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Your feedback helps us improve and helps other customers.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
        {/* SECTION A – WHAT DID YOU LIKE? */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="w-4 h-4 text-red-600 shrink-0" />
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Section A – What did you like? (Optional)
            </label>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Select one or more highlights of your visit:
          </p>

          <div className="flex flex-wrap gap-2">
            {HIGHLIGHT_OPTIONS.map((option) => {
              const isSelected = highlights.includes(option);
              return (
                <button
                  id={`chip-${option.toLowerCase().replace(/\s+/g, '-')}`}
                  key={option}
                  type="button"
                  onClick={() => onToggleHighlight(option)}
                  className={`text-xs sm:text-sm px-3.5 py-2 rounded-full font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-xs ring-2 ring-red-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5 space-y-5">
          {/* SECTION B – EMPLOYEE NAME */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <User className="w-4 h-4 text-slate-500" />
              <label
                htmlFor="input-employee-name"
                className="text-xs font-bold text-slate-700 tracking-tight"
              >
                Employee Name (Optional)
              </label>
            </div>
            <input
              id="input-employee-name"
              type="text"
              value={employeeName}
              onChange={(e) => onChangeEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="w-full text-sm px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors"
            />
          </div>

          {/* SECTION C – TEAM / DEPARTMENT */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Users2 className="w-4 h-4 text-slate-500" />
              <label
                htmlFor="input-team-dept"
                className="text-xs font-bold text-slate-700 tracking-tight"
              >
                Team / Department (Optional)
              </label>
            </div>
            <input
              id="input-team-dept"
              type="text"
              value={teamDepartment}
              onChange={(e) => onChangeTeamDepartment(e.target.value)}
              placeholder="e.g. Sales, Service, Delivery"
              className="w-full text-sm px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors"
            />
          </div>

          {/* SECTION D – ADDITIONAL REMARKS */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <label
                htmlFor="input-remarks"
                className="text-xs font-bold text-slate-700 tracking-tight"
              >
                Additional Remarks (Optional)
              </label>
            </div>
            <textarea
              id="input-remarks"
              rows={3}
              value={additionalRemarks}
              onChange={(e) => onChangeAdditionalRemarks(e.target.value)}
              placeholder="Tell us anything else about your experience..."
              className="w-full text-sm p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors resize-y min-h-[90px]"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          id="btn-back-step3"
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="btn-generate-review"
          type="button"
          onClick={onGenerate}
          className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-red-600/20 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate My Review</span>
        </button>
      </div>
    </div>
  );
};
