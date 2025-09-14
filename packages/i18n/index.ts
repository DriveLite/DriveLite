import {
  register,
  init,
  getLocaleFromNavigator,
  waitLocale,
} from "svelte-i18n";

// Define available locales
export const AVAILABLE_LOCALES = ["en", "fr"]; // add more as you add JSON files

// Register translations dynamically
for (const locale of AVAILABLE_LOCALES) {
  register(locale, () => import(`./locales/${locale}.json`));
}

export async function setupI18n(initialLocale?: string) {
  init({
    fallbackLocale: "en",
    initialLocale: initialLocale || getLocaleFromNavigator() || "en",
  });

  await waitLocale();
}
