<script lang="ts">
	import { Bold, Italic } from 'lucide-svelte';
	import { onMount, createEventDispatcher } from 'svelte';

	// Props
	export let value: string = '';
	export let placeholder: string = 'Write something...';
	export let minHeight: string = '120px';

	// Dispatcher untuk events
	const dispatch = createEventDispatcher();

	// Element references
	let editorElement: HTMLDivElement;

	// Format commands
	function formatText(command: string, value: string = '') {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) {
			editorElement.focus();
			return;
		}

		const range = selection.getRangeAt(0);
		const selectedText = range.extractContents();
		const parentElement = selection.focusNode?.parentElement;

		switch (command) {
			case 'bold':
				const boldElement = document.createElement('strong');
				boldElement.appendChild(selectedText);
				range.insertNode(boldElement);
				break;
			case 'italic':
				const italicElement = document.createElement('em');
				italicElement.appendChild(selectedText);
				range.insertNode(italicElement);
				break;
			case 'indent':
				// Implementasi indentasi bisa lebih kompleks, tergantung pada struktur yang Anda inginkan.
				// Contoh sederhana: menambahkan margin kiri pada elemen parent atau membungkus dengan div baru.
				const indentAmount = '20px';
				if (parentElement) {
					parentElement.style.marginLeft =
						parseInt(parentElement.style.marginLeft || '0', 10) + parseInt(indentAmount, 10) + 'px';
				} else {
					const divElement = document.createElement('div');
					divElement.style.marginLeft = indentAmount;
					divElement.appendChild(selectedText);
					range.insertNode(divElement);
				}
				break;
        case 'outdent':
  const outdentAmount = '20px';
  const parentElementOutdent = selection.focusNode?.parentElement;
  if (parentElementOutdent) {
    const currentMargin = parseInt(parentElementOutdent.style.marginLeft || '0', 10);
    const newMargin = Math.max(0, currentMargin - parseInt(outdentAmount, 10)); // Jangan sampai negatif
    parentElementOutdent.style.marginLeft = newMargin + 'px';
	// Tetap masukkan konten yang dipilih untuk menjaga seleksi
  }
  break;
      
			default:
				console.warn(`Perintah tidak dikenal: ${command}`);
				range.insertNode(selectedText); // Kembalikan teks jika perintah tidak dikenali
				break;
		}

		selection.removeAllRanges();
		// Move the selection to the end of the inserted node to maintain focus
		range.collapse(false);
		selection.addRange(range);

		updateValue();
		editorElement.focus();
	}

	// Update value dan trigger event
	function updateValue() {
		if (editorElement) {
			const newValue = editorElement.innerHTML;
			if (newValue !== value) {
				value = newValue;
				dispatch('input', { value });
				dispatch('change', { value });
			}
		}
	}

	// Initialize
	onMount(() => {
		if (editorElement) {
			editorElement.innerHTML = value;
			editorElement.addEventListener('input', updateValue);
			editorElement.addEventListener('blur', () => {
				dispatch('blur', { value });
			});
		}

		return () => {
			if (editorElement) {
				editorElement.removeEventListener('input', updateValue);
			}
		};
	});
</script>

<div class="rich-text-editor">
	<!-- Rich Text Toolbar -->
	<div
		class="flex flex-wrap items-center gap-1 p-2 mb-0 bg-gray-100 rounded-t-xl border border-gray-300 border-b-0"
	>
		<button
			type="button"
			class="p-1.5 rounded hover:bg-gray-200 transition-colors"
			title="Bold"
			aria-label="Bold"
			on:click={() => formatText('bold')}
		>
			<Bold class="w-4 h-4" />
		</button>

		<button
			type="button"
			class="p-1.5 rounded hover:bg-gray-200 transition-colors"
			title="Italic"
			aria-label="Italic"
			on:click={() => formatText('italic')}
		>
			<Italic class="w-4 h-4" />
		</button>
		<button
			type="button"
			class="p-1.5 rounded hover:bg-gray-200 transition-colors"
			title="Indent"
			aria-label="Indent"
			on:click={() => formatText('indent')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path d="M3 6h14v2H3V6zm5 5h9v2H8v-2zm-5 5h14v2H3v-2zm0-10v6l4-3-4-3z" />
			</svg>
		</button>

		<button
			type="button"
			class="p-1.5 rounded hover:bg-gray-200 transition-colors"
			title="Outdent"
			aria-label="Outdent"
			on:click={() => formatText('outdent')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path d="M3 6h14v2H3V6zm5 5h9v2H8v-2zm-5 5h14v2H3v-2zm4-10L3 9l4 3V6z" />
			</svg>
		</button>
	</div>

	<!-- Rich Text Editor -->
	<div
		bind:this={editorElement}
		contenteditable="true"
		class="w-full p-3 border border-gray-300 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all overflow-auto"
		style={`min-height: ${minHeight};`}
		data-placeholder={placeholder}
		on:input={updateValue}
	></div>
</div>

<style>
	[contenteditable='true']:empty:before {
		content: attr(data-placeholder);
		color: #9ca3af;
		cursor: text;
	}
</style>
