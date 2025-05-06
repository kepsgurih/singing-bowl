<script lang="ts">
	import { enhance } from '$app/forms';

	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	let sending = false;
	export let data: {
		groups: {
			id: string;
			label: string;
		}[];
	};

	let descriptionText = '';
	let isGroup = false;

	function handleDescriptionChange(event: CustomEvent) {
		descriptionText = event.detail.value;
	}

  function handleIsGroupChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.checked)
    isGroup = target.checked;
  }
</script>

<div class="w-full p-4 md:p-6 lg:p-8 font-kan max-w-2xl mx-auto">
	<div
		class="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
	>
		<h2 class="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800 font-nanum">
			New Schedule
		</h2>

		<form
			method="POST"
			class="space-y-6"
			use:enhance={() => {
				sending = true;
				return ({ update }) => {
					update({ invalidateAll: true }).finally(async () => {
						sending = false;
					});
				};
			}}
		>
			<!-- Form Field Group -->
			<div class="space-y-6">
				<!-- Label Field -->
				<div>
					<label for="label" class="block mb-2 text-sm font-medium text-gray-700">Label</label>
					<input
						id="label"
						name="label"
						type="text"
						class="w-full p-3.5 border-2 border-gray-200 rounded-xl bg-white
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-200 placeholder-gray-400 text-gray-700"
						placeholder="Nama Schedule"
						required
						disabled={sending}
					/>
				</div>

				<!-- Duration & Price Group -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label for="duration" class="block mb-2 text-sm font-medium text-gray-700"
							>Durasi (Menit)</label
						>
						<input
							id="duration"
							name="duration"
							type="number"
							class="w-full p-3.5 border-2 border-gray-200 rounded-xl bg-white
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200 placeholder-gray-400 text-gray-700"
							placeholder="Durasi"
							required
							disabled={sending}
						/>
					</div>

					<div>
						<label for="price" class="block mb-2 text-sm font-medium text-gray-700">Harga</label>
						<input
							id="price"
							name="price"
							type="number"
							class="w-full p-3.5 border-2 border-gray-200 rounded-xl bg-white
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200 placeholder-gray-400 text-gray-700"
							placeholder="Harga"
							required
							disabled={sending}
						/>
					</div>
				</div>

				<!-- Group Selection -->
				<div>
					<label for="groupId" class="block mb-2 text-sm font-medium text-gray-700">Group</label>
					<select
						id="groupId"
						name="groupId"
						class="w-full p-3.5 border-2 border-gray-200 rounded-xl bg-white
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-200 text-gray-700"
						required
						disabled={sending}
					>
						<option value="">Pilih Group</option>
						{#each data.groups as group}
							<option value={group.id}>{group.label}</option>
						{/each}
					</select>
				</div>

				<!-- Is Group Toggle -->
				<div class="flex items-center space-x-3 pt-2">
					<label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isGroup"
              class="sr-only peer"
              onchange={handleIsGroupChange}
              value={isGroup}
              checked={isGroup}
              disabled={sending}
            />
						<div
							class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
						></div>
					</label>

					<label for="isGroup" class="text-sm font-medium text-gray-700">Is Group?</label>
				</div>

				<!-- Rich Text Editor -->
				<div class="space-y-4">
					<label for="descriptions" class="block mb-2 text-sm font-medium text-gray-700"
						>Descriptions</label
					>
					<RichTextEditor
						value={descriptionText}
						placeholder="Write a short description"
						minHeight="120px"
						on:change={handleDescriptionChange}
						disabled={sending}
					/>
					<textarea id="caption" name="caption" value={descriptionText} class="hidden"></textarea>
				</div>
			</div>

			<!-- Submit Button -->
			<button
				disabled={sending}
				type="submit"
				class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl
               hover:from-blue-600 hover:to-blue-700 mt-8 font-semibold
               transform transition-all duration-200 hover:scale-[1.02]
               shadow-lg hover:shadow-xl active:scale-95"
			>
				{sending ? 'Loading...' : 'Create Schedule'}
			</button>
		</form>
	</div>
</div>
