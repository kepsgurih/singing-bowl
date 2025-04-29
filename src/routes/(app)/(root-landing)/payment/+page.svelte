<script lang="ts">
	import { headerTitle } from '$lib/stores/header';
	import { goto } from '$app/navigation';

	headerTitle.set({
        title: 'Successful Booking Confirmation',
        backUrl: '/schedule'
    });

	const paymentDetails = {
		bankName: 'Bank BCA',
		accountNumber: '1234567890',
		accountName: 'TheraVibe Studio',
		amount: 250000
	};

	const whatsappNumber = '6281234567890';
	const displayWhatsapp = '+62 812-3456-7890';

	const formatCurrency = (num: number): string =>
		new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR'
		}).format(num);

	const confirmMessage = `Hello, I have completed the payment of ${formatCurrency(
		paymentDetails.amount
	)} to account ${paymentDetails.accountNumber} (${paymentDetails.accountName}). Please find the proof of transfer attached.`;

	const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(confirmMessage)}`;
</script>

<div class="max-w-md mx-auto p-6 space-y-6">
	<div class="bg-white p-4 rounded-xl shadow space-y-4 border">
		<p class="text-justify font-kan">Thank you for entrusting me with your therapy sessions! I'll send over the details to your email and WhatsApp soon.
		</p>
		<p class="text-justify font-kan">If you have any questions, feel free to reach out via Instagram <span class="italic">@vickyaaa</span>.</p>
		<p class="text-justify font-kan">See you in our session!. 🪄🌸</p>
	</div>
</div>
