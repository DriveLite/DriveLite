import { writable } from "svelte/store";
import type { Theme } from "./types";

interface UIStore {
  theme: Theme;
  isSidebarOpen: boolean;
}

const defaultState: UIStore = {
  theme: 'system',
  isSidebarOpen: true
};

function loadState() {
  if (typeof localStorage === 'undefined') return defaultState;
  const raw = localStorage.getItem('ui-storage');
  return raw ? JSON.parse(raw) : defaultState;
}

export const ui = writable<UIStore>(loadState())

ui.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('ui-storage', JSON.stringify(value));
  }
});

export const toggleSidebar = () => {
  ui.update((s) => ({ ...s, isSidebarOpen: !s.isSidebarOpen }));
};

export const setTheme = (theme: Theme) => {
  ui.update((s) => ({ ...s, theme }));
};
