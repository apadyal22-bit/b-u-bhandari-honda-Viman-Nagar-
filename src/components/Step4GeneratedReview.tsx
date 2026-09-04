import React, { useState } from 'react';
import {
  Star,
  Copy,
  ExternalLink,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { StarRating, RATING_LABELS } from '../types';
import { isValidUrl } from '../utils/storage';

interface Step4GeneratedReviewProps {
  rating: StarRating;
  reviewText: string;
  reviewLink: string;
  onChangeReviewText: (text: string) => void;
  onRephrase: () => void;
  onBack: () => void;
  onStartAgain: () => void;
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

export const Step4GeneratedReview: React.FC<Step4GeneratedReviewProps> = ({
  rating,
  reviewText,
  reviewLink,
  onChangeReviewText,
  onRephrase,
  onBack,
  onStartAgain,
  onShowToast,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Copy to clipboard with fallback for Android Chrome / iFrame restrictions
  const handleCopy = async () => {
    if (!reviewText.trim()) {
      onShowToast('Review text is empty. Please enter your review.', 'error');
      return;
    }

    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(reviewText);
        copied = true;
      } catch (err) {
        console.warn('Navigator clipboard failed, trying fallback...', err);
      }
    }

    // Fallback using temporary textarea
    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = reviewText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (err) {
        console.error('Fallback copy command failed', err);
      }
    }

    if (copied) {
      setCopySuccess(true);
      onShowToast('Review copied successfully!', 'success');
      setTimeout(() => setCopySuccess(false), 3000);
    } else {
      onShowToast('Please select and copy the review manually.', 'error');
    }
  };

  // Handle Post Google Review
  const handlePostGoogleReview = () => {
    setUrlError(null);

    const trimmedLink = (reviewLink || '').trim();

    if (!trimmedLink) {
      setUrlError('Please add a Google Review Link in Settings.');
      onShowToast('Please add a Google Review Link in Settings.', 'error');
      return;
    }

    if (!isValidUrl(trimmedLink)) {
      setUrlError('Please enter a valid Google Review URL.');
      onShowToast('Please enter a valid Google Review URL.', 'error');
      return;
    }

    // Try to open the URL
    try {
      const opened = window.open(trimmedLink, '_blank', 'noopener,noreferrer');
      if (!opened) {
        // In case of popup blocking
        window.location.href = trimmedLink;
      }
    } catch {
      window.location.href = trimmedLink;
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Your Google Review is Ready
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Review, customize, and copy before posting on Google
        </p>
      </div>

      {/* Review Box Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Rating Banner */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= rating
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-slate-200 fill-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800 ml-1">
              {RATING_LABELS[rating]}
            </span>
          </div>

          {/* Rephrase button (local variation) */}
          <button
            id="btn-rephrase-review"
            type="button"
            onClick={onRephrase}
            className="text-xs text-slate-600 hover:text-red-600 font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
            title="Generate an alternate wording"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>Try Alternate Phrasing</span>
          </button>
        </div>

        {/* Editable Review Textarea */}
        <div className="relative">
          <textarea
            id="textarea-generated-review"
            rows={6}
            value={reviewText}
            onChange={(e) => onChangeReviewText(e.target.value)}
            className="w-full text-sm leading-relaxed p-3.5 sm:p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors resize-y font-normal"
            placeholder="Your generated review will appear here..."
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 px-1">
            <span>Customer editable text box</span>
            <span>{reviewText.length} characters</span>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="bg-slate-50 rounded-lg p-3 text-[11px] sm:text-xs text-slate-600 border border-slate-200/70 flex items-start gap-2">
          <span className="text-slate-400 font-bold">ℹ</span>
          <p className="leading-snug">
            Please review and edit your feedback before posting. Your review should reflect your genuine experience.
          </p>
        </div>

        {/* URL Error Message if any */}
        {urlError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{urlError}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {/* 1. Copy Review Button */}
          <button
            id="btn-copy-review"
            type="button"
            onClick={handleCopy}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
              copySuccess
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-slate-900 hover:bg-black text-white active:scale-[0.99]'
            }`}
          >
            {copySuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>Review Copied Successfully!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Review</span>
              </>
            )}
          </button>

          {/* 2. Post Google Review Button */}
          <button
            id="btn-post-google-review"
            type="button"
            onClick={handlePostGoogleReview}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-red-600/20 transition-all"
          >
            <span>Post Google Review</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Nav: Back & Start Again */}
      <div className="flex items-center gap-3 pt-1">
        <button
          id="btn-back-step4"
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          id="btn-start-again"
          type="button"
          onClick={onStartAgain}
          className="flex-1 py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Start Again</span>
        </button>
      </div>
    </div>
  );
};
