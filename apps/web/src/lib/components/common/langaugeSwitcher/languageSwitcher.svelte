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
	import * as Select from '$lib/components/ui/select/index';
	import { defaultLang, langs } from '$lib/constants';
	import { locale } from 'svelte-i18n';

	let value = $state(defaultLang.code);
	const triggerContent = $derived(
		langs.find((lang) => lang.code === value)?.name ?? 'Select a language'
	);
	$effect(() => {
		locale.set(value);
	});
	const sortedLangs = [...langs].sort((a, b) => a.name.localeCompare(b.name));
</script>

<div>
	<Select.Root type="single" name="Language" bind:value>
		<Select.Trigger class="w-[180px]">
			{triggerContent}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Languages</Select.Label>
				{#each sortedLangs as lang (lang.code)}
					<Select.Item value={lang.code} label={lang.name}>
						{lang.code}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
