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

"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return fallbackValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallbackValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return fallbackValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
