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
	import { ChildKey } from '$lib/constants.js';
	import type { ChildData } from '$lib/types.js';
	import { withPrefix } from '$lib/utils/internal';
	import { getContext, type Snippet } from 'svelte';

	type ContextType = {
		register: (key: ChildKey, data: () => ChildData) => void;
	};
	type Props = {
		for: ChildKey;
		as: ChildKey;
		class?: string;
		children: Snippet;
	};

	const { for: key, as, children, class: className }: Props = $props();

	const context = getContext<ContextType>(withPrefix(key));

	const data = $derived({ snippet: children, class: className });

	if (context) {
		context.register(as, () => data);
	} else {
		console.log('Unable to find context for key:', key);
	}
</script>
