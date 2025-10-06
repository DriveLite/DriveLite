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

export const locales = ["en"];
export const defaultLocale = "en";

export const languageNames = {
  en: "English",
};

export function getCanonicalUrl(path: string, locale: string = defaultLocale) {
  const baseUrl = "https://drivelite.org";
  const cleanPath = path.replace(/^\/+/, "");

  return `${baseUrl}/docs/${locale}/${cleanPath}`;
}

export function getAlternateUrl(path: string, currentLocale: string) {
  const alternates: Record<string, string> = {};

  locales.map((locale) => {
    if (locale === currentLocale) return;

    alternates[locale] = getCanonicalUrl(path, currentLocale);
  });

  return alternates;
}
