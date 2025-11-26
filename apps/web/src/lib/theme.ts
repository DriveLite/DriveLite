import { ui } from "./stores";
import type { Theme } from "./types";

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (theme === 'light') {
    root.classList.remove('dark');
  } else if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', isDark);
  }
}

export function initThemeWatcher() {
  ui.subscribe((state) => applyTheme(state.theme));

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', (_) => {
    ui.update((s) => {
      if (s.theme === 'system') applyTheme('system');
      return s;
    });
  });
}
