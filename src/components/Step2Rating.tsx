import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { StarRating, RATING_LABELS } from '../types';

interface Step2RatingProps {
  selected: StarRating | null;
  onSelect: (rating: StarRating) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const Step2Rating: React.FC<Step2RatingProps> = ({
  selected,
  onSelect,
  onBack,
  onContinue,
}) => {
  const [hovered, setHovered] = useState<StarRating | null>(null);

  const activeRating = hovered || selected;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          How was your experience?
        </h2>
        <p className="text-sm text-slate-600">
          Tap a star to rate your dealership visit
        </p>
      </div>

      {/* Star Rating Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-xs">
        {/* Star Buttons Container */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
          {([1, 2, 3, 4, 5] as StarRating[]).map((star) => {
            const isFilled = activeRating !== null && star <= activeRating;

            return (
              <button
                id={`btn-star-${star}`}
                key={star}
                type="button"
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                onClick={() => onSelect(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                className="p-2 sm:p-2.5 rounded-xl transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer touch-manipulation"
              >
                <Star
                  className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-150 ${
                    isFilled
                      ? 'fill-amber-400 text-amber-500 filter drop-shadow-xs'
                      : 'text-slate-300 hover:text-slate-400 fill-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Rating Label */}
        <div className="h-10 mt-3 flex items-center justify-center">
          {activeRating ? (
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-1.5 rounded-full">
              <span className="text-base font-bold text-slate-900">
                {RATING_LABELS[activeRating]}
              </span>
              <span className="text-xs text-amber-600 font-semibold">
                ({activeRating} of 5 Stars)
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-slate-400">
              Select 1 to 5 stars to proceed
            </span>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          id="btn-back-step2"
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          id="btn-continue-step2"
          type="button"
          disabled={!selected}
          onClick={onContinue}
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
            selected
              ? 'bg-red-600 hover:bg-red-700 text-white active:scale-[0.99] cursor-pointer shadow-red-600/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
