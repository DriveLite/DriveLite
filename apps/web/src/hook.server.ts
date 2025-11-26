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

import type { Handle } from '@sveltejs/kit';
import { defaultLang } from '$lib/constants';

export const handle: Handle = async ({ event, resolve }) => {
	let locale = event.cookies.get('locale');

	if (!locale) {
		// detect from Accept-Language header
		const header = event.request.headers.get('accept-language');
		locale = header?.split(',')[0] ?? defaultLang.code;

		// save it for next time
		event.cookies.set('locale', locale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}

	event.locals = locale;

	return resolve(event);
};
