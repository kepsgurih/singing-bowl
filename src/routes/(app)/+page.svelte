<script>
	import { Calendar } from "lucide-svelte";

	const links = [
	  { title: "Instagram", url: "https://instagram.com/namamu", icon: "📸" },
	  { title: "LinkedIn", url: "https://linkedin.com/in/namamu", icon: "💼" },
	  { title: "GitHub", url: "https://github.com/namamu", icon: "💻" },
	  { title: "Website Pribadi", url: "https://namamu.com", icon: "🌐" },
	];
  </script>
  
	<img
	  src="https://picsum.photos/seed/picsum/200/200"
	  alt="Foto Profil"
	  class="w-24 h-24 rounded-full border-4 border-white shadow-lg mt-10 mb-4"
	/>
	<h1 class="text-xl font-semibold text-gray-800 mb-1">@<span class="font-nanum">vickyaaa</span></h1>
	<div class="w-full max-w-md px-6 mb-6">
		<p class="text-sm text-gray-600 text-justify leading-relaxed">
		  Selamat datang! Temukan semua tautan pentingku di bawah ini ✨ Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil molestias, ab a nemo officia temporibus ducimus harum aspernatur, qui vel enim. Vitae modi impedit doloremque voluptas itaque quo cupiditate consequuntur.
		</p>
	  </div>
	<div class="w-full max-w-md flex flex-col gap-4">
		<a href="/schedule" class="bg-white border border-gray-200 rounded-xl py-3 px-5 flex items-center gap-3 shadow-md hover:bg-gray-50 transition mx-10">
		<span class="text-xl"><Calendar /></span>
		<span class="text-lg font-medium text-gray-800 font-nanum">Book a Singing Bowl Session</span>
		</a>
	  {#each links as link}
		<a
		  href={link.url}
		  class="bg-white border border-gray-200 rounded-xl py-3 px-5 flex items-center gap-3 shadow-md hover:bg-gray-50 transition mx-10"
		>
		  <span class="text-xl">{link.icon}</span>
		  <span class="text-lg font-medium text-gray-800 font-nanum">{link.title}</span>
		</a>
	  {/each}
	</div>
  