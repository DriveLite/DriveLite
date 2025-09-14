import { setupI18n } from '@drivelite/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	// Ensure i18n is ready before SSR render
	await setupI18n('en');
	return {};
};
