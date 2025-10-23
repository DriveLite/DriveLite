<!--
DriveLite - The self-hostable file storage solution.
Copyright (C) 2025  

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script lang="ts">
	import type { StackProps } from '$lib/types';
	import { cleanClass } from '$lib/utils/internal';
	import { tv } from 'tailwind-variants';

	const {
		align,
		direction = 'column',
		wrap = false,
		class: className,
		fullWidth,
		fullHeight,
		gap = 2,
		children
	}: StackProps = $props();

	const styles = tv({
		base: 'flex gap-2',
		variants: {
			direction: {
				row: 'flex-row',
				column: 'flex-col'
			},
			align: {
				start: 'items-start',
				center: 'items-center',
				end: 'items-end'
			},
			fullWidth: {
				true: 'w-full',
				false: ''
			},
			fullHeight: {
				true: 'h-full',
				false: ''
			},
			gap: {
				0: 'gap-0',
				1: 'gap-1',
				2: 'gap-2',
				3: 'gap-3',
				4: 'gap-4',
				5: 'gap-5',
				6: 'gap-6',
				7: 'gap-7',
				8: 'gap-8'
			},
			wrap: {
				true: 'flex-wrap',
				false: ''
			}
		}
	});
</script>

<div
	class={cleanClass(
		styles({
			align,
			direction,
			gap,
			wrap,
			fullHeight,
			fullWidth
		}),
		className
	)}
>
	{@render children()}
</div>
