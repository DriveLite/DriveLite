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
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { ChildKey } from '$lib/constants';
	import { cleanClass, withChildrenSnippets } from '$lib/utils/internal';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children?: Snippet;
	};
	const { class: className, children }: Props = $props();
	const { getChildren: getChildSnippet } = withChildrenSnippets(ChildKey.AppShell);
	const header = $derived(getChildSnippet(ChildKey.AppShellHeader));
	const sidebar = $derived(getChildSnippet(ChildKey.AppShellSidebar));
</script>

<div class={cleanClass('flex h-dvh flex-col overflow-hidden', className)}>
	{#if header}
		<header class="border-b">
			{@render header?.snippet()}
		</header>
	{/if}
	<div class="relative flex w-full grow overflow-y-auto">
		{#if sidebar}
			{@render sidebar?.snippet()}
		{/if}
		<ScrollArea class="w-full grow" orientation="vertical">
			{@render children?.()}
		</ScrollArea>
	</div>
</div>
