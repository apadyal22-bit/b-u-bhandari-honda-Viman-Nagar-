import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { Step1VisitType } from './components/Step1VisitType';
import { Step2Rating } from './components/Step2Rating';
import { Step3Details } from './components/Step3Details';
import { Step4GeneratedReview } from './components/Step4GeneratedReview';
import { SettingsModal } from './components/SettingsModal';
import { Toast, ToastMessage } from './components/Toast';
import {
  VisitType,
  StarRating,
  AppSettings,
  CustomerFeedback,
} from './types';
import { loadSettings, saveSettings, resetSettings } from './utils/storage';
import { generateReviewText } from './utils/reviewGenerator';

export default function App() {
  // Settings State (persisted in LocalStorage)
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 4-Step Navigation State (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Customer Feedback Form State
  const [feedback, setFeedback] = useState<CustomerFeedback>({
    visitType: null,
    rating: null,
    selectedHighlights: [],
    employeeName: '',
    teamDepartment: '',
    additionalRemarks: '',
    generatedReview: '',
  });

  // Deterministic local variation counter for "rephrase"
  const [variationIndex, setVariationIndex] = useState(0);

  // Notification Toast State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({
      id: `${Date.now()}-${Math.random()}`,
      message,
      type,
    });
  };

  // Keep settings updated in localStorage
  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    showToast('Settings saved successfully!', 'success');

    // If review was already generated, update the location name in it
    if (feedback.visitType && feedback.rating) {
      const updatedReview = generateReviewText({
        location: newSettings.locationName,
        visitType: feedback.visitType,
        rating: feedback.rating,
        highlights: feedback.selectedHighlights,
        employeeName: feedback.employeeName,
        teamDepartment: feedback.teamDepartment,
        additionalRemarks: feedback.additionalRemarks,
        variationIndex,
      });
      setFeedback((prev) => ({ ...prev, generatedReview: updatedReview }));
    }
  };

  const handleResetSettings = () => {
    const defaults = resetSettings();
    setSettings(defaults);
    showToast('Settings reset to default!', 'info');
  };

  // Step 1: Visit Type Selection
  const handleSelectVisitType = (type: VisitType) => {
    setFeedback((prev) => ({ ...prev, visitType: type }));
  };

  const handleContinueFromStep1 = () => {
    if (!feedback.visitType) {
      showToast('Please select what brought you to the dealership.', 'error');
      return;
    }
    setCurrentStep(2);
  };

  // Step 2: Star Rating Selection
  const handleSelectRating = (rating: StarRating) => {
    setFeedback((prev) => ({ ...prev, rating }));
  };

  const handleContinueFromStep2 = () => {
    if (!feedback.rating) {
      showToast('Please select a star rating to continue.', 'error');
      return;
    }
    setCurrentStep(3);
  };

  // Step 3: Highlights & Details
  const handleToggleHighlight = (item: string) => {
    setFeedback((prev) => {
      const exists = prev.selectedHighlights.includes(item);
      return {
        ...prev,
        selectedHighlights: exists
          ? prev.selectedHighlights.filter((h) => h !== item)
          : [...prev.selectedHighlights, item],
      };
    });
  };

  const handleGenerateReview = (overrideVariation?: number) => {
    if (!feedback.visitType || !feedback.rating) {
      showToast('Please complete previous steps first.', 'error');
      return;
    }

    const vIndex = overrideVariation !== undefined ? overrideVariation : variationIndex;
    const review = generateReviewText({
      location: settings.locationName,
      visitType: feedback.visitType,
      rating: feedback.rating,
      highlights: feedback.selectedHighlights,
      employeeName: feedback.employeeName,
      teamDepartment: feedback.teamDepartment,
      additionalRemarks: feedback.additionalRemarks,
      variationIndex: vIndex,
    });

    setFeedback((prev) => ({ ...prev, generatedReview: review }));
    setCurrentStep(4);
  };

  const handleRephraseReview = () => {
    const nextIndex = variationIndex + 1;
    setVariationIndex(nextIndex);
    handleGenerateReview(nextIndex);
    showToast('Loaded alternate phrasing', 'info');
  };

  // Step 4: Start Again
  const handleStartAgain = () => {
    setFeedback({
      visitType: null,
      rating: null,
      selectedHighlights: [],
      employeeName: '',
      teamDepartment: '',
      additionalRemarks: '',
      generatedReview: '',
    });
    setVariationIndex(0);
    setCurrentStep(1);
    showToast('Feedback form reset. Ready for a new review!', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Centered Mobile/Kiosk Application Container */}
      <div className="w-full max-w-xl mx-auto bg-white min-h-screen sm:min-h-[92vh] sm:my-4 sm:rounded-2xl sm:shadow-lg sm:border sm:border-slate-200 flex flex-col overflow-hidden">
        {/* Header with Dealership Name & Dynamic Location */}
        <Header
          locationName={settings.locationName}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* 4-Step Progress Bar */}
        <ProgressBar
          currentStep={currentStep}
          onStepClick={(step) => {
            // Allow going back to previous steps without losing data
            if (step < currentStep) {
              setCurrentStep(step);
            }
          }}
        />

        {/* Step Views Content Body */}
        <main className="flex-1 p-4 sm:p-6 flex flex-col justify-start">
          {currentStep === 1 && (
            <Step1VisitType
              selected={feedback.visitType}
              onSelect={handleSelectVisitType}
              onContinue={handleContinueFromStep1}
            />
          )}

          {currentStep === 2 && (
            <Step2Rating
              selected={feedback.rating}
              onSelect={handleSelectRating}
              onBack={() => setCurrentStep(1)}
              onContinue={handleContinueFromStep2}
            />
          )}

          {currentStep === 3 && (
            <Step3Details
              highlights={feedback.selectedHighlights}
              employeeName={feedback.employeeName}
              teamDepartment={feedback.teamDepartment}
              additionalRemarks={feedback.additionalRemarks}
              onToggleHighlight={handleToggleHighlight}
              onChangeEmployeeName={(name) =>
                setFeedback((prev) => ({ ...prev, employeeName: name }))
              }
              onChangeTeamDepartment={(dept) =>
                setFeedback((prev) => ({ ...prev, teamDepartment: dept }))
              }
              onChangeAdditionalRemarks={(remarks) =>
                setFeedback((prev) => ({ ...prev, additionalRemarks: remarks }))
              }
              onBack={() => setCurrentStep(2)}
              onGenerate={() => handleGenerateReview()}
            />
          )}

          {currentStep === 4 && (
            <Step4GeneratedReview
              rating={feedback.rating || 5}
              reviewText={feedback.generatedReview}
              reviewLink={settings.reviewLink}
              onChangeReviewText={(text) =>
                setFeedback((prev) => ({ ...prev, generatedReview: text }))
              }
              onRephrase={handleRephraseReview}
              onBack={() => setCurrentStep(3)}
              onStartAgain={handleStartAgain}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Minimal Footer */}
        <footer className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs font-semibold text-slate-500">
            Customer Feedback & Review Assistant
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {settings.locationName}
          </p>
        </footer>
      </div>

      {/* Settings Modal (Showroom Name & Google Review Link ONLY) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        currentSettings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        onReset={handleResetSettings}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
