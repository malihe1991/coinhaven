<script lang="ts">
	import { onMount } from 'svelte';
	import type { ICountry } from 'src/types';

	export let countryList: ICountry[];
	export let changeCurrentCountry: any;

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
		changeCurrentCountry(name);
		handleSearch(name);
		showCountryList = false;
	}

	function handleChange(event: any) {
		handleSearch(event.target.value);
	}

	function handlefocus(event: any) {
		showCountryList = true;
		event.target.placeholder = 'Search entering the country';
	}
</script>

<div class="flex flex-col justify-center my-10 relative m-auto w-96">
	<div class="text-xs text-slate-400 pb-1">Select your country</div>
	<div class="relative" on:click={handlefocus}>
		<div class="search-icon absolute w3-large"><i class="fa fa-search opacity-20" /></div>
		<div class="hidden arrow absolute w3-tiny" class:show={!showCountryList}>
			<i class="fa fa-chevron-down opacity-20" />
		</div>
		<div class="hidden arrow absolute w3-tiny" class:show={showCountryList} >
			<i class="fa fa-chevron-up text-blue-600" />
		</div>

		<input
			type="text"
			name="search"
			value={searchInput}
			on:input={handleChange}
			autocomplete="off"
			placeholder="Search"
			class="m-auto w-96 bg-gray-50 pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		/>
	</div>

	<ul
		class:show={showCountryList}
		class="countryList hidden absolute m-auto w-96 bg-white z-50 border-2 border-slate-50 py-2 px-5 shadow-lg"
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
	.arrow {
		top: 10px;
		right: 10px;
	}
</style>
