<script lang="ts">
	import { onMount } from 'svelte';
	import type { ICountry } from 'src/types';

	export let countryList: ICountry[];
	export let handleClick: any;

	let searchInput = '';
	let showCountryList = false;
	let selectedCountries = [] as ICountry[];

	onMount(() => {
		selectedCountries = countryList;
	});

	function handleSearch(searchValue: string) {
		selectedCountries = [] as ICountry[];
		let list = [] as ICountry[];

		searchInput = searchValue;

		countryList.forEach((country: ICountry) => {
			const countryName = country.name.toLowerCase();
			const searchCountry = searchValue.toLowerCase();

			if (countryName.includes(searchCountry)) {
				list.push(country);
				selectedCountries = list;
			}
		});
	}

	function handleSelect(name: string) {
		handleClick(name);
		handleSearch(name);
		showCountryList = false;
	}

	function handleChange(event: any) {
		handleSearch(event.target.value);
	}
</script>

<div class="flex flex-col justify-center my-10 relative m-auto w-96">
	<div class="text-xs text-slate-400 pb-1">Select your country</div>
	<div class="relative">
		<div class="search-icon absolute w3-large"><i class="fa fa-search opacity-20" /></div>
		<input
			type="text"
			name="search"
			value={searchInput}
			on:focus={() => (showCountryList = true)}
			on:input={handleChange}
			autocomplete="off"
			placeholder="Search entring the country"
			class="m-auto w-96 bg-gray-50 pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		/>
	</div>

	<ul
		class:show={showCountryList}
		class="countryList hidden absolute m-auto w-96 bg-white z-50 border-2 border-slate-50 py-2 px-5"
	>
		{#each selectedCountries as { name, emoji }}
			<li
				on:click={() => handleSelect(name)}
				class={`p-2 hover:bg-slate-50 cursor-pointer ${searchInput === name ? 'bg-slate-50' : ''}`}
			>
				{emoji}
				{name}
			</li>
		{/each}
	</ul>
</div>

<style>
	.show {
		display: block;
	}
	.countryList {
		top: 70px;
		left: 50%;
		transform: translateX(-50%);
	}
	.search-icon {
		top: 6px;
		left: 10px;
	}
</style>
