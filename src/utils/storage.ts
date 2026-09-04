import { AppSettings, DEFAULT_LOCATION, DEFAULT_REVIEW_LINK } from '../types';

const STORAGE_KEY = 'bu_bhandari_honda_settings';

export function loadSettings(): AppSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.locationName === 'string' && typeof parsed.reviewLink === 'string') {
        return {
          locationName: parsed.locationName.trim() || DEFAULT_LOCATION,
          reviewLink: parsed.reviewLink.trim() || DEFAULT_REVIEW_LINK,
        };
      }
    }
  } catch (err) {
    console.warn('Could not load settings from LocalStorage', err);
  }
  return {
    locationName: DEFAULT_LOCATION,
    reviewLink: DEFAULT_REVIEW_LINK,
  };
}

export function saveSettings(settings: AppSettings): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (err) {
    console.error('Failed to save settings to LocalStorage', err);
    return false;
  }
}

export function resetSettings(): AppSettings {
  const defaults: AppSettings = {
    locationName: DEFAULT_LOCATION,
    reviewLink: DEFAULT_REVIEW_LINK,
  };
  saveSettings(defaults);
  return defaults;
}

export function isValidUrl(url: string): boolean {
  if (!url || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
