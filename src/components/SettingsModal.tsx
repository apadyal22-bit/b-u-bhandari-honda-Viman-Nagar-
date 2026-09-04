import React, { useState } from 'react';
import { X, Save, RotateCcw, AlertCircle, CheckCircle2, MapPin, Link2 } from 'lucide-react';
import { AppSettings, DEFAULT_LOCATION, DEFAULT_REVIEW_LINK } from '../types';
import { isValidUrl } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  currentSettings: AppSettings;
  onClose: () => void;
  onSave: (newSettings: AppSettings) => void;
  onReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  currentSettings,
  onClose,
  onSave,
  onReset,
}) => {
  const [locationName, setLocationName] = useState(currentSettings.locationName);
  const [reviewLink, setReviewLink] = useState(currentSettings.reviewLink);
  const [error, setError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state if modal reopens
  React.useEffect(() => {
    if (isOpen) {
      setLocationName(currentSettings.locationName);
      setReviewLink(currentSettings.reviewLink);
      setError(null);
      setShowResetConfirm(false);
    }
  }, [isOpen, currentSettings]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedLoc = locationName.trim();
    const trimmedLink = reviewLink.trim();

    if (!trimmedLoc) {
      setError('Please enter a Showroom / Location Name.');
      return;
    }

    if (!trimmedLink) {
      setError('Please add a Google Review Link in Settings.');
      return;
    }

    if (!isValidUrl(trimmedLink)) {
      setError('Please enter a valid Google Review URL (starting with http:// or https://).');
      return;
    }

    onSave({
      locationName: trimmedLoc,
      reviewLink: trimmedLink,
    });
    onClose();
  };

  const handleConfirmReset = () => {
    onReset();
    setLocationName(DEFAULT_LOCATION);
    setReviewLink(DEFAULT_REVIEW_LINK);
    setShowResetConfirm(false);
    setError(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3
              id="settings-dialog-title"
              className="text-base font-bold text-slate-900 tracking-tight"
            >
              Dealership Settings
            </h3>
            <p className="text-xs text-slate-500">
              Configure branch name and Google Review link
            </p>
          </div>
          <button
            id="btn-close-settings"
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          {/* Error display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Field 1: Showroom / Location Name */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              <label
                htmlFor="input-setting-location"
                className="text-xs font-bold text-slate-700 uppercase tracking-wide"
              >
                Showroom / Location Name
              </label>
            </div>
            <input
              id="input-setting-location"
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="B.U. Bhandari Honda – Viman Nagar"
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              Used dynamically across all headers and generated reviews.
            </p>
          </div>

          {/* Field 2: Google Review Link */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-red-600" />
              <label
                htmlFor="input-setting-review-link"
                className="text-xs font-bold text-slate-700 uppercase tracking-wide"
              >
                Google Review Link
              </label>
            </div>
            <input
              id="input-setting-review-link"
              type="url"
              value={reviewLink}
              onChange={(e) => setReviewLink(e.target.value)}
              placeholder="https://g.page/r/..."
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 font-mono text-xs transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              The direct Google Review URL opened when the customer taps &quot;Post Google Review&quot;.
            </p>
          </div>

          {/* Reset Confirmation or Trigger */}
          <div className="pt-2 border-t border-slate-100">
            {showResetConfirm ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                <p className="text-xs text-amber-900 font-medium">
                  Restore default location ({DEFAULT_LOCATION}) and review URL?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-confirm-reset"
                    type="button"
                    onClick={handleConfirmReset}
                    className="px-3 py-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg cursor-pointer"
                  >
                    Yes, Reset
                  </button>
                  <button
                    id="btn-cancel-reset"
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="btn-trigger-reset"
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1.5 cursor-pointer py-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            )}
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              id="btn-save-settings"
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-red-600/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
