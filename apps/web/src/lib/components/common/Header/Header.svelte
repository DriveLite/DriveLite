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
	import ModeToggle from "../ModeToggle";

	let navItems = [{ name: 'Home', href: '/' }];
</script>

<header class="flex h-16 items-center justify-between bg-background p-4 text-foreground">
	<h1 class="text-xl font-bold">My SvelteKit App</h1>
	<nav>
		{#each navItems as item (item.href)}
			<a href={item.href} class="ml-4 hover:underline">{item.name}</a>
		{/each}
	</nav>
  <ModeToggle />
</header>
