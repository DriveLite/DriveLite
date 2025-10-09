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

import type { ChildKey } from '$lib/constants';
import type { ChildData } from '$lib/types';
import { setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { twMerge } from 'tailwind-merge';

export const withPrefix = (key: string) => `DriveLite-${key}`;

export const cleanClass = (...classNames: unknown[]) => {
	return twMerge(
		classNames
			.filter((className) => {
				if (!className || typeof className === 'boolean') {
					return false;
				}

				return typeof className === 'string';
			})
			.join(' ')
	);
};

export const withChildrenSnippets = (key: ChildKey) => {
	const map = new SvelteMap<ChildKey, () => ChildData>();

	setContext(withPrefix(key), {
		register: (child: ChildKey, data: () => ChildData) => map.set(child, data)
	});

	return {
		getChildren: (key: ChildKey) => map.get(key)?.()
	};
};
