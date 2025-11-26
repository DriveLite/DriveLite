// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025  
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
