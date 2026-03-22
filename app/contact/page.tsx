'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { submitContactForm } from '@/lib/contact';
import { fadeIn, staggerContainer } from '@/lib/motion';

export default function ContactPage() {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
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
			setFormState({ name: '', email: '', subject: '', message: '' });
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
		<div className="py-16 md:py-24">
			<div className="container">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="max-w-4xl mx-auto"
				>
					<motion.div
						variants={fadeIn('down', 0.2)}
						className="text-center mb-12"
					>
						<h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
						<p className="text-lg text-muted-foreground">
							Have a question or want to work together? Feel free to reach out!
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<motion.div variants={fadeIn('right', 0.3)}>
							<Card className="card-gradient h-full">
								<CardContent className="p-6">
									<h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
									<div className="space-y-4">
										<div className="flex items-center">
											<Phone className="h-5 w-5 text-primary mr-3" />
											<p className="text-muted-foreground">+1 416 907 5950</p>
										</div>
										<div className="flex items-center">
											<Mail className="h-5 w-5 text-primary mr-3" />
											<p className="text-muted-foreground">vishaaltor@gmail.com</p>
										</div>
										<div className="flex items-center">
											<MapPin className="h-5 w-5 text-primary mr-3" />
											<p className="text-muted-foreground">Toronto, Canada</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn('left', 0.3)}>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<Input
										placeholder="Your Name"
										name="name"
										value={formState.name}
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<Input
										type="email"
										placeholder="Your Email"
										name="email"
										value={formState.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<Input
										placeholder="Subject"
										name="subject"
										value={formState.subject}
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<Textarea
										placeholder="Your Message"
										name="message"
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
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
