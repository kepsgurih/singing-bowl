<script lang="ts">
	export let data: {
		config: {
			name: string;
			description: string;
			avatar: string;
		};
		links: {
			name: string;
			url: string;
			icon: string;
			username: string;
		}[];
	};
</script>

<svelte:head>
	<title>Links - Connect with Vicky</title>
	<meta
		name="description"
		content="Connect with Vicky and explore all important links including Instagram, LinkedIn, GitHub, and personal website. Book a Singing Bowl Session and discover more!"
	/>
	<meta
		name="keywords"
		content="Vicky, links, Instagram, LinkedIn, GitHub, personal website, Singing Bowl Session, connect, social media"
	/>
	<meta name="author" content="Vicky" />
	<meta property="og:title" content="Links - Connect with Vicky" />
	<meta
		property="og:description"
		content="Connect with Vicky and explore all important links including Instagram, LinkedIn, GitHub, and personal website. Book a Singing Bowl Session and discover more!"
	/>
</svelte:head>
<img
	src={data.config.avatar}
	alt="Foto Profil"
	class="w-24 h-24 rounded-full border-4 border-white shadow-lg mt-10 mb-4"
/>
<h1 class="text-2xl text-gray-800 mb-1 font-gummy">{data.config.name}</h1>
<div class="w-full max-w-md px-6 mb-6">
	<p class="text-sm text-gray-600 text-justify leading-relaxed">
		{@html data.config.description}
	</p>
</div>

<div class="w-full max-w-md flex flex-col gap-4">
	<a
		href="/schedule"
		class="bg-white border border-gray-200 rounded-xl py-3 px-5 flex items-center gap-3 shadow-md hover:bg-gray-50 transition mx-10"
	>
		<span class="text-xl">
			<img src="/icons/calendar.svg" alt="Calendar" class="w-6 h-6" />
		</span>
		<div class="flex flex-col">
			<span class="text-gray-800 font-gummy">Book a Session</span>
			<span class="text-xs text-gray-500">Singing Bowl Therapy 🪷</span>
		</div>
	</a>

	{#each data?.links as link}
		<a
			href={link.url}
			class="bg-white border border-gray-200 rounded-xl py-3 px-5 flex items-center gap-3 shadow-md hover:bg-gray-50 transition mx-10"
			target="_blank"
		>
			<span class="text-xl">
				{#if link.icon === 'instagram'}
					<img src="/icons/instagram.svg" alt="Instagram" class="w-6 h-6" />
				{:else if link.icon === 'youtube'}
					<img src="/icons/youtube.svg" alt="YouTube" class="w-6 h-6" />
				{:else if link.icon === 'soundcloud'}
					<img src="/icons/soundcloud.svg" alt="SoundCloud" class="w-6 h-6" />
				{:else if link.icon === 'tiktok'}
					<img src="/icons/tiktok.svg" alt="TikTok" class="w-6 h-6" />
				{:else if link.icon === 'spotify'}
					<img src="/icons/spotify.svg" alt="Spotify" class="w-6 h-6" />
				{:else if link.icon === 'email'}
					<img src="/icons/mail.svg" alt="Email" class="w-6 h-6" />
				{/if}
			</span>
			<div class="flex flex-col">
				<span class="text-gray-800 font-gummy">{link.name}</span>
				<span class="text-xs text-gray-500">{link.username}</span>
			</div>
		</a>
	{/each}
</div>
