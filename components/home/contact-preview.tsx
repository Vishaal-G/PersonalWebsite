'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeader } from '@/components/ui/section-header';
import { submitContactForm } from '@/lib/contact';
import { fadeIn } from '@/lib/motion';

export function ContactPreview() {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus(null);

		try {
			await submitContactForm(formState);
			setFormState({ name: '', email: '', message: '' });
			setStatus({ type: 'success', message: 'Your message has been sent successfully.' });
		} catch (error) {
			setStatus({
				type: 'error',
				message: error instanceof Error ? error.message : 'Unable to send your message.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<div className="section-shell section-shell-muted">
					<SectionHeader
						title="Get In Touch"
						description="Interested in working together or have a question? Feel free to reach out!"
						className="text-center"
					/>

					<motion.div
						variants={fadeIn('up', 0.3)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="mx-auto mt-10 max-w-md"
					>
						<div className="floating-form">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<Input
										name="name"
										placeholder="Your Name"
										value={formState.name}
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<Input
										name="email"
										type="email"
										placeholder="Your Email"
										value={formState.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<Textarea
										name="message"
										placeholder="Your Message"
										value={formState.message}
										onChange={handleChange}
										required
										className="min-h-[150px]"
									/>
								</div>
								{status && (
									<p
										className={
											status.type === 'success'
												? 'text-sm text-accent'
												: 'text-sm text-destructive'
										}
									>
										{status.message}
									</p>
								)}
								<Button type="submit" className="w-full" disabled={isSubmitting}>
									{isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
								</Button>
							</form>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
