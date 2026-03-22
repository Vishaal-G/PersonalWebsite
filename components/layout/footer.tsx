import Link from 'next/link';
import { Linkedin, Github, Twitter, Facebook, Instagram, Phone, Mail, MessageSquare } from 'lucide-react';

import { siteConfig } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ icon: <Phone className="h-5 w-5" />, href: siteConfig.links.phone, label: 'Phone' },
		{ icon: <Mail className="h-5 w-5" />, href: siteConfig.links.email, label: 'Email' },
		{ icon: <Linkedin className="h-5 w-5" />, href: siteConfig.links.linkedin, label: 'LinkedIn' },
		{ icon: <Github className="h-5 w-5" />, href: siteConfig.links.github, label: 'GitHub' },
		{ icon: <MessageSquare className="h-5 w-5" />, href: siteConfig.links.whatsapp, label: 'WhatsApp' },
		{ icon: <Twitter className="h-5 w-5" />, href: siteConfig.links.twitter, label: 'Twitter' },
		{ icon: <Facebook className="h-5 w-5" />, href: siteConfig.links.facebook, label: 'Facebook' },
		{ icon: <Instagram className="h-5 w-5" />, href: siteConfig.links.instagram, label: 'Instagram' },
	];

	const navColumns = [
		{
			title: 'About',
			links: [
				{ title: 'About Me', href: '/about' },
				{ title: 'Education', href: '/education' },
				{ title: 'Skills', href: '/skills' },
			],
		},
		{
			title: 'Work',
			links: [
				{ title: 'Experience', href: '/experience' },
				{ title: 'Projects', href: '/projects' },
				{ title: 'Certificates', href: '/certificates' },
			],
		},
		{
			title: 'Connect',
			links: [
				{ title: 'Blog', href: '/blog' },
				{ title: 'Contact', href: '/contact' },
				{ title: 'Resume', href: '#', download: true },
			],
		},
	];

	return (
		<footer className="pb-10 pt-4">
			<div className="container mx-auto px-4">
				<div className="section-shell section-shell-muted">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
						<div className="md:col-span-1">
							<Link href="/" className="inline-block">
								<span className="text-2xl font-bold tracking-[-0.08em] text-gradient">Portfolio</span>
							</Link>
							<p className="mt-4 text-sm text-muted-foreground">
								A professional portfolio showcasing my skills, projects, and achievements in engineering.
							</p>
							<div className="mt-6 flex flex-wrap gap-3">
								{socialLinks.map((link, index) => (
									<Button key={index} size="icon" variant="outline" asChild>
										<Link href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">
											{link.icon}
										</Link>
									</Button>
								))}
							</div>
						</div>

						<div className="grid grid-cols-1 gap-8 md:col-span-3 sm:grid-cols-3">
							{navColumns.map((column, index) => (
								<div key={index}>
									<h3 className="mb-3 font-semibold">{column.title}</h3>
									<ul className="space-y-2">
										{column.links.map((link, linkIndex) => (
											<li key={linkIndex}>
												<Link
													href={link.href}
													className="text-sm text-muted-foreground transition-colors hover:text-primary"
													{...(link.download ? { download: true } : {})}
												>
													{link.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					<Separator className="my-8" />

					<div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
						<p className="text-muted-foreground">
							&copy; {currentYear} Engineering Portfolio. All rights reserved.
						</p>
						<div className="flex gap-4">
							<Link href="/privacy" className="text-muted-foreground transition-colors hover:text-primary">
								Privacy Policy
							</Link>
							<Link href="/terms" className="text-muted-foreground transition-colors hover:text-primary">
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
