<script lang="ts">
	import { headerTitle } from '$lib/stores/header';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { rupiahFormat } from '$lib/helper/rupiahFormat';
	import dayjs from 'dayjs';
	dayjs.locale('en');
	import { writable } from 'svelte/store';

	export let form;
	export let data: {
		calendar: {
			id: string;
			date: Date;
			time: string;
			kelas: string;
			status: string;
		};
		schedule: {
			id: string;
			label: string;
			duration: number;
			description: string[];
			price: number;
		};
	};

	headerTitle.set({
		title: 'Confirm Your Session',
		backUrl: '/calendar/' + data.schedule.id
	});

	let loading = writable(false);

	const toggleLoading = (value: boolean) => {
		loading.update(() => value); // Ini akan membalikkan nilai loading
	};
</script>

<div class="p-6 space-y-6">
	<h2 class="text-2xl font-semibold text-gray-800">Confirm Your Session</h2>
	<div class="bg-white p-4 rounded-xl shadow space-y-2 border">
		<h3 class="text-lg font-medium text-gray-700">{data.schedule.label}</h3>
		<div class="text-sm text-gray-600">
			{#each data.schedule.description as desc}
				<div>{desc}</div>
			{/each}
		</div>
		<div class="flex justify-between text-sm text-gray-600 mt-4">
			<span>🗓️ Day, date </span>
			<strong>{dayjs(data.calendar.date).format('dddd, D MMMM YYYY')}</strong>
		</div>
		<div class="flex justify-between text-sm text-gray-600">
			<span>⏰ Time</span>
			<strong>{data.calendar.time}</strong>
		</div>
		<div class="flex justify-between text-sm text-gray-600">
			<span>⏳ Duration</span>
			<strong>{data.schedule.duration} min</strong>
		</div>
		<div class="flex justify-between text-sm text-gray-600">
			<span>💳 Energy exchange</span>
			<strong>{rupiahFormat(data.schedule.price)}</strong>
		</div>
		<div class="flex justify-between text-sm text-gray-600">
			<span>📍 Location</span>
			<strong>{data.calendar.kelas}</strong>
		</div>
	</div>
	{#if page.data.user}
		<form
			method="POST"
			action="?one"
			use:enhance={() => {
				toggleLoading(true);
				return ({ update }) => {
					update({ invalidateAll: true }).finally(async () => {
						toggleLoading(false);
					});
				};
			}}
		>
			<div class="text-green-700 bg-green-100 p-4 rounded-lg text-sm mb-4 max-w-md mx-auto">
				{#if data.schedule.price > 0}
					<div>Please review the session you've chosen.</div>
					<div>If everything is correct, select the button
						below.</div>
				{:else}
					Tell me why you need this therapy session?
				{/if}
			</div>
			<input type="hidden" name="id" value={data.calendar.id} />
			{#if data.schedule.price === 0}
				<textarea
					disabled={$loading}
					name="reason"
					placeholder="Please explain why you need this therapy session"
					class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
					required
				></textarea>
			{/if}
			<button
				type="submit"
				disabled={$loading}
				class="mt-6 w-full block text-center py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
			>
				{$loading ? 'Loading...' : 'Book this session'}
			</button>
		</form>
		{#if form?.messageError}
			<div class="text-red-700 bg-red-100 p-4 rounded-lg text-sm mb-4">
				{form.messageError}
			</div>
		{/if}
	{:else}
		<div class="bg-yellow-100 p-4 rounded-lg text-sm text-yellow-700">
			To proceed, please <strong>Log in</strong> or <strong>Register</strong> your account
		</div>
		<div class="flex gap-4">
			<button
				onclick={() => goto('/signin')}
				class="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl shadow"
			>
				Login
			</button>
			<button
				onclick={() => goto('/register')}
				class="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow"
			>
				Register
			</button>
		</div>
	{/if}
</div>
