'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PanelSection } from '@/components/ui/panels/panel-shell';
import { projects } from '@/lib/constants';

export function ProjectsPanel() {
	return (
		<div className="space-y-4">
			{projects.map((project) => (
				<PanelSection key={project.title} eyebrow="Featured Project" title={project.title}>
					<div className="relative mb-4 h-44 overflow-hidden rounded-[1.1rem] border border-white/10">
						<Image src={project.image} alt={project.title} fill className="object-cover" />
					</div>
					<p className="text-sm leading-6 text-slate-300">{project.description}</p>
					<div className="mt-4 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-200">
								{tag}
							</span>
						))}
					</div>
					<div className="mt-5 flex flex-wrap gap-3">
						{project.link ? (
							<Button size="sm" variant="outline" asChild>
								<Link href={project.link} target="_blank" rel="noreferrer">
									Open Demo <ArrowUpRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						) : null}
						{project.repo ? (
							<Button size="sm" variant="outline" asChild>
								<Link href={project.repo} target="_blank" rel="noreferrer">
									View Repo <Github className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						) : null}
					</div>
				</PanelSection>
			))}
		</div>
	);
}
