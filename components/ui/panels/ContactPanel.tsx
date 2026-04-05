'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PanelSection } from '@/components/ui/panels/panel-shell';
import { siteConfig } from '@/lib/constants';

export function ContactPanel() {
	return (
		<div className="space-y-4">
			<PanelSection eyebrow="Contact" title="Let&apos;s build something sharp.">
				<p className="text-sm leading-6 text-slate-300">
					If you want to talk about internships, startup ideas, backend systems, or creative tech, send me a message.
				</p>
				<div className="mt-5 space-y-3">
					<Link
						href={`mailto:${siteConfig.links.email}`}
						className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-slate-200 transition hover:border-cyan-300/40"
					>
						<Mail className="h-4 w-4 text-cyan-300" />
						{siteConfig.links.email}
					</Link>
					<Link
						href={siteConfig.links.phone}
						className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-slate-200 transition hover:border-cyan-300/40"
					>
						<Phone className="h-4 w-4 text-cyan-300" />
						+1 416 907 5950
					</Link>
				</div>
				<div className="mt-5 flex flex-wrap gap-3">
					<Button size="sm" variant="outline" asChild>
						<Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
							LinkedIn <Linkedin className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button size="sm" variant="outline" asChild>
						<Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
							GitHub <Github className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button asChild>
						<Link href="/contact">Open Contact Form</Link>
					</Button>
				</div>
			</PanelSection>
		</div>
	);
}
