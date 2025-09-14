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
	import { _, locale } from 'svelte-i18n';
	import { AVAILABLE_LOCALES } from '@drivelite/i18n';

	let selectedLocale = $locale;

	// Watch for changes in select
	function changeLocale(event: Event) {
		const value = (event.target as HTMLSelectElement).value;
		locale.set(value);
	}
</script>

<label for="locale-select">Select Language:</label>
<select id="locale-select" bind:value={selectedLocale} on:change={changeLocale}>
	{#each AVAILABLE_LOCALES as loc}
		<option value={loc}>{loc.toUpperCase()}</option>
	{/each}
</select>

<h1>{$_('welcome')}</h1>
<p>{$_('upload')}</p>
