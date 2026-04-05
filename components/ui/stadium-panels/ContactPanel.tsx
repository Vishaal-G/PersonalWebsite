'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

import { submitContactForm } from '@/lib/contact';
import { siteConfig } from '@/lib/constants';
import { StadiumPanelSection } from '@/components/ui/stadium-panels/panel-shell';

export function ContactPanel() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
	const [error, setError] = useState('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus('sending');
		setError('');
		try {
			await submitContactForm({
				name: form.name,
				email: form.email,
				subject: 'Baseball Stadium Portfolio Contact',
				message: form.message,
			});
			setStatus('sent');
			setForm({ name: '', email: '', message: '' });
		} catch (err) {
			setStatus('error');
			setError(err instanceof Error ? err.message : 'Unable to send message.');
		}
	};

	return (
		<div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
			<StadiumPanelSection eyebrow="Contact Dugout" title="Reach Out">
				<div className="space-y-3">
					<Link href={`mailto:${siteConfig.links.email}`} className="flex items-center gap-3 rounded-2xl bg-[#f7fcf7] px-4 py-3 text-[#17351f]">
						<Mail className="h-4 w-4 text-[#2e7d32]" /> {siteConfig.links.email}
					</Link>
					<Link href={siteConfig.links.phone} className="flex items-center gap-3 rounded-2xl bg-[#f7fcf7] px-4 py-3 text-[#17351f]">
						<Phone className="h-4 w-4 text-[#2e7d32]" /> +1 416 907 5950
					</Link>
					<Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#f7fcf7] px-4 py-3 text-[#17351f]">
						<Github className="h-4 w-4 text-[#2e7d32]" /> GitHub
					</Link>
					<Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#f7fcf7] px-4 py-3 text-[#17351f]">
						<Linkedin className="h-4 w-4 text-[#2e7d32]" /> LinkedIn
					</Link>
				</div>
			</StadiumPanelSection>

			<StadiumPanelSection title="Contact Form">
				<form className="space-y-3" onSubmit={onSubmit}>
					<input
						className="w-full rounded-2xl border border-[#cfe2cf] bg-[#f7fcf7] px-4 py-3 text-[#17351f] outline-none focus:border-[#2e7d32]"
						placeholder="Name"
						value={form.name}
						onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
						required
					/>
					<input
						className="w-full rounded-2xl border border-[#cfe2cf] bg-[#f7fcf7] px-4 py-3 text-[#17351f] outline-none focus:border-[#2e7d32]"
						type="email"
						placeholder="Email"
						value={form.email}
						onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
						required
					/>
					<textarea
						className="min-h-[160px] w-full rounded-2xl border border-[#cfe2cf] bg-[#f7fcf7] px-4 py-3 text-[#17351f] outline-none focus:border-[#2e7d32]"
						placeholder="Message"
						value={form.message}
						onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
						required
					/>
					<button className="rounded-full bg-[#2e7d32] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60" disabled={status === 'sending'}>
						{status === 'sending' ? 'Sending...' : 'Send Message'}
					</button>
					{status === 'sent' ? <p className="text-sm font-medium text-[#2e7d32]">Message sent successfully.</p> : null}
					{status === 'error' ? <p className="text-sm font-medium text-[#b71c1c]">{error}</p> : null}
				</form>
			</StadiumPanelSection>
		</div>
	);
}
