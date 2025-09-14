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
