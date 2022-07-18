<script lang="ts">
	import type { ICountriesName, ISocketResponse } from 'src/types';

	export let data: ISocketResponse;
	export let currentCountry: ICountriesName;

	let countriesInfo = {
		'United States': {
			ratio: 1,
			abbreviation: 'USD',
			symbol: '$'
		},
		Germany: {
			ratio: 1.02,
			abbreviation: 'EUR',
			symbol: '€'
		},
		Ukraine:{
			ratio: 0.041,
			abbreviation: 'UAH',
			symbol: '₴'
		},
		Hungary: {
			ratio: 2.52,
			abbreviation: 'HUF',
			symbol: 'Ft'
		}
	};
</script>

<div class="max-w-sm mx-2">
	<div class="card__content rounded shadow-lg">
		<div class="px-6 py-4">
			<div class="flex justify-between items-center">
				<div class="text-sm">{data?.s}</div>
				<div class={`${ data?.cp[0] == '-' ? 'text-red-500' : 'text-green-500'}`}>{data?.cp}</div>
			</div>
			<div class='text-base text-lg text-gray-700 font-bold'>
				{data?.h}
			</div>
			<div class="text-sm font-medium">
				<span>volume:</span>
				<span>{data?.lc}</span>
			</div>
		</div>
	</div>
	<div class="text-sm font-medium text-gray-700 px-2 py-2 mb-10">
		<span>{countriesInfo[currentCountry].abbreviation}:</span>
		<span>{countriesInfo[currentCountry].symbol}</span>
		<span>{(Number(data?.c) / countriesInfo[currentCountry].ratio).toFixed(7)}</span>
	</div>
</div>

<style>
	.card__content {
		width: 280px;
		height: 150px;
	}
</style>
