import { NextResponse } from 'next/server';
import { z } from 'zod';

import { siteConfig } from '@/lib/constants';

const contactSchema = z.object({
	name: z.string().trim().min(2).max(100),
	email: z.string().trim().email().max(200),
	subject: z.string().trim().max(200).optional().default(''),
	message: z.string().trim().min(10).max(5000),
});

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
	const resendApiKey = process.env.RESEND_API_KEY;
	const fromEmail = process.env.CONTACT_FROM_EMAIL;
	const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.links.email;

	if (!resendApiKey || !fromEmail) {
		return NextResponse.json(
			{
				error: 'Email is not configured yet. Add RESEND_API_KEY and CONTACT_FROM_EMAIL to your .env.local file.',
			},
			{ status: 500 }
		);
	}

	try {
		const json = await request.json();
		const parsed = contactSchema.safeParse(json);

		if (!parsed.success) {
			return NextResponse.json(
				{ error: 'Please fill out all fields with valid information.' },
				{ status: 400 }
			);
		}

		const { name, email, subject, message } = parsed.data;
		const normalizedSubject = subject || 'Portfolio Contact Form';
		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safeSubject = escapeHtml(normalizedSubject);
		const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${resendApiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [toEmail],
				reply_to: email,
				subject: `Portfolio Contact: ${normalizedSubject}`,
				text: [
					`Name: ${name}`,
					`Email: ${email}`,
					`Subject: ${normalizedSubject}`,
					'',
					message,
				].join('\n'),
				html: `
					<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
						<h2>New Portfolio Contact Message</h2>
						<p><strong>Name:</strong> ${safeName}</p>
						<p><strong>Email:</strong> ${safeEmail}</p>
						<p><strong>Subject:</strong> ${safeSubject}</p>
						<p><strong>Message:</strong></p>
						<p>${safeMessage}</p>
					</div>
				`,
			}),
		});

		if (!resendResponse.ok) {
			const errorBody = await resendResponse.text();
			console.error('Resend API error:', errorBody);

			return NextResponse.json(
				{ error: 'Your message could not be sent right now. Please try again.' },
				{ status: 502 }
			);
		}

		const data = await resendResponse.json();
		return NextResponse.json({ success: true, id: data.id });
	} catch (error) {
		console.error('Contact form error:', error);
		return NextResponse.json(
			{ error: 'Something went wrong while sending your message.' },
			{ status: 500 }
		);
	}
}
