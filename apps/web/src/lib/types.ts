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

import type { Snippet } from 'svelte';

export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ChildData = {
	snippet: Snippet;
	class?: string;
};

type StackBaseProps = {
	class?: string;
	children: Snippet;
	gap?: Gap;
	wrap?: boolean;
	fullWidth?: boolean;
	fullHeight?: boolean;
};

export type StackProps = StackBaseProps & {
	align?: 'start' | 'center' | 'end';
	direction?: 'row' | 'column';
};
