'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

import { submitContactForm } from '@/lib/contact';

const fieldClass =
	'w-full rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/70';

export function ContactForm() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
	const [error, setError] = useState('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus('sending');
		setError('');
		try {
			await submitContactForm({ ...form, subject: 'Portfolio Contact' });
			setStatus('sent');
			setForm({ name: '', email: '', message: '' });
		} catch (err) {
			setStatus('error');
			setError(err instanceof Error ? err.message : 'Unable to send message.');
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-3">
			<div className="grid gap-3 sm:grid-cols-2">
				<label className="sr-only" htmlFor="contact-name">Name</label>
				<input
					id="contact-name"
					className={fieldClass}
					placeholder="Name"
					autoComplete="name"
					value={form.name}
					onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
					required
				/>
				<label className="sr-only" htmlFor="contact-email">Email</label>
				<input
					id="contact-email"
					className={fieldClass}
					type="email"
					placeholder="Email"
					autoComplete="email"
					value={form.email}
					onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
					required
				/>
			</div>
			<label className="sr-only" htmlFor="contact-message">Message</label>
			<textarea
				id="contact-message"
				className={`${fieldClass} min-h-[132px] resize-y`}
				placeholder="What's on your mind?"
				value={form.message}
				onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
				required
			/>
			<div className="flex flex-wrap items-center gap-3">
				<button
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
					disabled={status === 'sending'}
				>
					{status === 'sending' ? 'Sending…' : 'Send message'}
					<ArrowRight className="h-4 w-4" />
				</button>
				{status === 'sent' ? (
					<p className="flex items-center gap-1.5 text-sm text-primary" role="status">
						<Check className="h-4 w-4" /> Thanks! I&apos;ll get back to you soon.
					</p>
				) : null}
				{status === 'error' ? (
					<p className="text-sm text-destructive" role="alert">
						{error}
					</p>
				) : null}
			</div>
		</form>
	);
}
