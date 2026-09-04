import React from 'react';
import { Settings as SettingsIcon, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  locationName: string;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ locationName, onOpenSettings }) => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-30">
      {/* Honda Red Brand Top Bar */}
      <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-700 w-full" />

      <div className="px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Honda Wing Emblem Styled Badge */}
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0 tracking-tighter">
            H
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none truncate">
                B.U. Bhandari Honda
              </h1>
              <span className="inline-flex items-center text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-wide">
                Official
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 truncate mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{locationName}</span>
            </p>
          </div>
        </div>

        {/* Settings Button */}
        <button
          id="btn-open-settings"
          type="button"
          onClick={onOpenSettings}
          aria-label="Settings"
          className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 shadow-xs flex items-center gap-1.5 text-xs font-semibold shrink-0 cursor-pointer"
        >
          <SettingsIcon className="w-4 h-4 text-slate-700" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
