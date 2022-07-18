<script context="module">
	import { request } from 'graphql-request';
	import { convertObjectToArray } from '../utils/convertObjectToArray';
	import { countriesQuery } from '../repositories/graphql';

	export const load = async () => {
		const result = await request('https://countries.trevorblades.com/', countriesQuery);
		const countries = convertObjectToArray(result);
		return {
			props: {
				countries
			}
		};
	};
</script>

<script lang="ts">
	import io from 'socket.io-client';
	import { onMount } from 'svelte';

	import Search from '$lib/search.svelte';
	import Card from '$lib/card.svelte';
	import Backdrop from '$lib/backdrop.svelte';

	import type { ISocketResponse, ISocketData, ICountriesName, ICountry } from '../types/index';

	export let socketDatas = {} as ISocketData;
	export let countries: ICountry[];

	let currentCountry: ICountriesName = 'United States';

	onMount(() => {
		const api_key = 'API_KEY';
		const url = 'wss://fcsapi.com';
		const currencyIds = '1,2,3'; // 1,1984,80,81,7774,7778

		const socket = io(url, {
			transports: ['websocket'],
			path: '/v3/'
		});

		socket.emit('heartbeat', api_key);
		socket.emit('real_time_join', currencyIds);
		socket.on('data_received', function (data: ISocketResponse) {
			const key = data['s'];
			if (
				(!socketDatas.hasOwnProperty(key) && Object.keys(socketDatas).length < 3) ||
				socketDatas.hasOwnProperty(key)
			) {
				socketDatas[key] = data;
			}
		});
	});

	function handleClick(event: any) {
		currentCountry = event;
	}
</script>

<Search countryList={countries} handleClick={handleClick} />

{#if Object.values(socketDatas).length === 0}
<Backdrop />
{/if}

<div class="flex justify-center flex-wrap my-10">
	{#each Object.values(socketDatas) as data}
		<Card data={data} currentCountry={currentCountry} />
	{/each}
</div>
