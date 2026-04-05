'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PanelSection, StatChip } from '@/components/ui/panels/panel-shell';
import { siteConfig } from '@/lib/constants';

export function AboutPanel() {
	return (
		<div className="space-y-4">
			<PanelSection eyebrow="About" title="Engineering with curiosity and visual taste.">
				<div className="relative mb-4 h-56 overflow-hidden rounded-[1.2rem] border border-white/10">
					<Image src="/images/about.jpg" alt="Vishaal Gopalan" fill className="object-cover" />
				</div>
				<div className="space-y-3 text-sm leading-6 text-slate-300">
					<p>
						I&apos;m a Computer Engineering student at the University of Toronto focused on building smart,
						useful systems that still feel intentional to use.
					</p>
					<p>
						What pulls me in most is the combination of backend logic, machine learning, and interfaces
						that make technical work feel simpler and more human.
					</p>
					<p>
						This desk is meant to feel like stepping into my workspace instead of reading a standard
						portfolio page.
					</p>
				</div>
				<div className="mt-4 flex flex-wrap gap-2">
					<StatChip label="Based in" value="Toronto, Canada" />
					<StatChip label="Studying" value="Computer Engineering" />
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
				</div>
			</PanelSection>
		</div>
	);
}
