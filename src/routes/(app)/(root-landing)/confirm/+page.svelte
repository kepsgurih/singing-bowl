<script lang="ts">
	import { headerTitle } from '$lib/stores/header';
	import { accessToken, loadingSession, userSession } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	headerTitle.set({
        title: 'Confirm Your Session',
        backUrl: '/calendar'
    });

	// Simulasi data kelas yang dipilih (bisa diganti dengan props atau store jika dinamis)
	const selectedClass = {
		title: 'Healing Sound Therapy',
		duration: '45 minutes',
		description:
			'A deep therapeutic session using sound vibrations to restore balance and promote relaxation.',
		price: 'Rp250.000',
		location: 'Jl. Kebahagiaan No. 123, Jakarta Selatan' // kosongkan jika home care
	};

	const token = get(accessToken);
</script>

<div class="max-w-md mx-auto p-6 space-y-6">
	<h2 class="text-2xl font-semibold text-gray-800">Confirm Your Session</h2>

	<div class="bg-white p-4 rounded-xl shadow space-y-2 border">
		<h3 class="text-lg font-medium text-gray-700">{selectedClass.title}</h3>
		<p class="text-sm text-gray-600">{selectedClass.description}</p>
		<p class="text-sm text-gray-600">⏱ Duration: <strong>{selectedClass.duration}</strong></p>
		<p class="text-sm text-gray-600">💰 Price: <strong>{selectedClass.price}</strong></p>
		{#if selectedClass.location}
			<p class="text-sm text-gray-600">📍 Location: <strong>{selectedClass.location}</strong></p>
		{/if}
	</div>

	{#if $loadingSession}
		<div class="text-sm text-gray-600">Loading...</div>
	{:else if token && $userSession}
		<div class="text-green-700 bg-green-100 p-4 rounded-lg text-sm">
			Account verified. You can proceed to payment or confirmation.
		</div>
		<button
			on:click={() => goto('/payment')}
			class="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition"
		>
			Continue
		</button>
	{:else}
		<div class="bg-yellow-100 p-4 rounded-lg text-sm text-yellow-700">
			We need to know who you are before continuing. Please log in or register your account.
		</div>
		<div class="flex gap-4">
			<button
				on:click={() => goto('/signin')}
				class="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl shadow"
			>
				Login
			</button>
			<button
				on:click={() => goto('/register')}
				class="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow"
			>
				Register
			</button>
		</div>
	{/if}
</div>
