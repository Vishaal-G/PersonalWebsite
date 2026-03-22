export type ContactFormPayload = {
	name: string;
	email: string;
	subject?: string;
	message: string;
};

export async function submitContactForm(payload: ContactFormPayload) {
	const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_bf44niw';
	const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
	const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
	const toEmail = process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || 'vishaaltor@gmail.com';

	if (!templateId || !publicKey) {
		throw new Error(
			'Email is not configured yet. Add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to your .env.local file.'
		);
	}

	const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			service_id: serviceId,
			template_id: templateId,
			user_id: publicKey,
			template_params: {
				from_name: payload.name,
				reply_to: payload.email,
				email: payload.email,
				subject: payload.subject || 'Portfolio Contact Form',
				message: payload.message,
				to_email: toEmail,
			},
		}),
	});

	if (!response.ok) {
		const errorText = await response.text().catch(() => '');
		throw new Error(errorText || 'Unable to send message.');
	}

	return { success: true };
}
