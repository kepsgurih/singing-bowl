<script lang="ts">
	import { headerTitle } from "$lib/stores/header";
	import { safeHTML } from "$lib/utils/safeHTML";

    export let data: {
        config: {
            title: string;
            description: string;
        };
    };
    headerTitle.set({
		title: data.config.title || 'Guideline',
		backUrl: '/schedule'
	});
    </script>
<div class="w-full max-w-md flex flex-col gap-3 p-6 mx-auto">
    <h1 class="text-2xl font-semibold text-gray-800">{data.config.title}</h1>
    <div class="text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm">
        {@html safeHTML(data.config.description)}
    </div>

</div>