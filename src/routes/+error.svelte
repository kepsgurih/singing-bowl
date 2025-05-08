<script lang="ts">
	import { page } from '$app/state';
</script>

<section>
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-sm text-center">
			<h1 class="mb-4 font-gummy tracking-tight font-extrabold lg:text-9xl text-green-600 font-bold" style="font-size: 80px;">{page.status}</h1>
			<p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">{page.error?.message}</p>
			<p class="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
			<a href="/" class="inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</a>
		</div>   
	</div>
</section>