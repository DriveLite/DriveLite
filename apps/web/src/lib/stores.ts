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
