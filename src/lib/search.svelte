<script lang="ts">
	export let data: any;
	export let handleClick: any;
</script>

<div class="flex flex-col justify-center my-10">
	{#if data !== undefined}
		<div class="m-auto w-96 text-xs text-slate-400 pb-1">Select your country</div>
		<select on:change={handleClick} class="m-auto w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			{#each data as { name, emoji }}
				<option value={name}>{emoji}  {name}</option>
			{/each}
		</select>
	{/if}
</div>
