<script context="module">
	import { request, gql } from 'graphql-request';
	import { convertObjectToArray } from '../utils/convertObjectToArray';

	const query = gql`
		{
			t1: country(code: "US") {
				name
				emoji
			}
			t2: country(code: "DE") {
				name
				emoji
			}
			t3: country(code: "UA") {
				name
				emoji
			}
			t4: country(code: "HU") {
				name
				emoji
			}
		}
	`;

	export const load = async () => {
		const result = await request('https://countries.trevorblades.com/', query);
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

	import type { ISocketResponse, ISocketData, ICountriesName } from '../types/index';

	export let socketDatas = {} as ISocketData;
	export let countries: any;
	export let currentCountry: ICountriesName = 'United States';

	onMount(() => {
		const api_key = 'API_KEY';
		const url = 'wss://fcsapi.com';
		const currency_ids = '1,2,3'; // 1,1984,80,81,7774,7778

		const socket = io(url, {
			transports: ['websocket'],
			path: '/v3/'
		});

		socket.emit('heartbeat', api_key);
		socket.emit('real_time_join', currency_ids);
		socket.on('data_received', function (prices_data: ISocketResponse) {
			const key = prices_data['s'];
			if (
				(!socketDatas.hasOwnProperty(key) && Object.keys(socketDatas).length < 3) ||
				socketDatas.hasOwnProperty(key)
			) {
				socketDatas[key] = prices_data;
			}
		});
	});

	function handleClick(event: any) {
		const name = event.target.value;
		currentCountry = name;
	}
</script>

<Search data={countries} handleClick={handleClick} />

{#if Object.values(socketDatas).length === 0}
<Backdrop />
{/if}

<div class="flex justify-center flex-wrap my-10">
	{#each Object.values(socketDatas) as data}
		<Card data={data} currentCountry={currentCountry} />
	{/each}
</div>
