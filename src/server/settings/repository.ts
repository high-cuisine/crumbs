import { getStore } from '../store';
import type { AppSettings } from '../store/types';

export function getSettings(): AppSettings {
  return getStore().getSettings();
}

export function saveSettings(settings: AppSettings): void {
  getStore().saveSettings(settings);
}
