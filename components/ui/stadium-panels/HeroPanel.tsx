'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

import { projects, siteConfig } from '@/lib/constants';
import { StadiumPanelSection, StadiumPill } from '@/components/ui/stadium-panels/panel-shell';

export function HeroPanel() {
	return (
		<div className="space-y-4">
			<StadiumPanelSection eyebrow="Home Plate" title="Vishaal Gopalan">
				<p className="text-base font-medium text-[#17351f]">Computer Engineering @ UofT | Backend, AI, and product-focused engineering.</p>
				<p className="mt-3">
					The idea here is to start at home plate, then move base by base through the story: who I am, what I know,
					what I have built, and what I am aiming to do next.
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<StadiumPill color="#e3f2fd">{projects.length} Projects</StadiumPill>
					<StadiumPill color="#fff8e1">9 Skills</StadiumPill>
					<StadiumPill color="#ffebee">5 Hackathons</StadiumPill>
				</div>
			</StadiumPanelSection>

			<StadiumPanelSection title="Links & Contact">
				<div className="grid gap-3 sm:grid-cols-2">
					<Link className="rounded-2xl border border-[#d6e9d6] bg-[#f7fcf7] p-4 transition hover:border-[#2e7d32]" href={siteConfig.links.github} target="_blank" rel="noreferrer">
						<div className="flex items-center gap-3 font-semibold text-[#17351f]"><Github className="h-4 w-4" /> GitHub</div>
						<p className="mt-2 text-sm text-[#58725d]">{siteConfig.links.github}</p>
					</Link>
					<Link className="rounded-2xl border border-[#d6e9d6] bg-[#f7fcf7] p-4 transition hover:border-[#2e7d32]" href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
						<div className="flex items-center gap-3 font-semibold text-[#17351f]"><Linkedin className="h-4 w-4" /> LinkedIn</div>
						<p className="mt-2 text-sm text-[#58725d]">{siteConfig.links.linkedin}</p>
					</Link>
					<Link className="rounded-2xl border border-[#d6e9d6] bg-[#f7fcf7] p-4 transition hover:border-[#2e7d32]" href={`mailto:${siteConfig.links.email}`}>
						<div className="flex items-center gap-3 font-semibold text-[#17351f]"><Mail className="h-4 w-4" /> Email</div>
						<p className="mt-2 text-sm text-[#58725d]">{siteConfig.links.email}</p>
					</Link>
					<Link className="rounded-2xl border border-[#d6e9d6] bg-[#f7fcf7] p-4 transition hover:border-[#2e7d32]" href={siteConfig.links.phone}>
						<div className="flex items-center gap-3 font-semibold text-[#17351f]"><Phone className="h-4 w-4" /> Phone</div>
						<p className="mt-2 text-sm text-[#58725d]">+1 416 907 5950</p>
					</Link>
				</div>
			</StadiumPanelSection>
		</div>
	);
}
