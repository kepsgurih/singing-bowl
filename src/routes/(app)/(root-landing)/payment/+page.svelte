<script lang="ts">
	import { headerTitle } from '$lib/stores/header';
	import { goto } from '$app/navigation';

	headerTitle.set({
        title: 'Payment Instructions',
        backUrl: '/confirm'
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
	<h2 class="text-2xl font-semibold text-gray-800">Payment Instructions</h2>

	<div class="bg-white p-4 rounded-xl shadow border space-y-2 text-gray-700">
		<p>Please transfer the exact amount to the following account:</p>
		<ul class="space-y-1 text-sm">
			<li><strong>Bank:</strong> {paymentDetails.bankName}</li>
			<li><strong>Account Number:</strong> {paymentDetails.accountNumber}</li>
			<li><strong>Account Name:</strong> {paymentDetails.accountName}</li>
			<li><strong>Amount:</strong> {formatCurrency(paymentDetails.amount)}</li>
		</ul>
	</div>

	<div class="text-sm text-gray-600 space-y-2">
		<p>
			After completing the payment, please click the button below to confirm via WhatsApp.
		</p>
		<p>
			<strong>Don't forget to attach the proof of transfer</strong> (e.g. screenshot or receipt) to help us verify your booking quickly.
		</p>
	</div>

	<a
		href={whatsappLink}
		target="_blank"
		class="block text-center py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
	>
		Confirm via WhatsApp
	</a>

	<p class="text-center text-sm text-gray-500 mt-2">
		Or contact us directly at <strong>{displayWhatsapp}</strong>
	</p>
</div>
