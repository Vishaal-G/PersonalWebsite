'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

import { projects } from '@/lib/constants';
import { StadiumPanelSection, StadiumPill } from '@/components/ui/stadium-panels/panel-shell';

export function ProjectsPanel() {
	return (
		<div className="grid gap-4 lg:grid-cols-2">
			{projects.map((project) => (
				<StadiumPanelSection key={project.title} eyebrow="Third Base" title={project.title}>
					<div className="relative mb-4 h-40 overflow-hidden rounded-[1.25rem] border border-[#d6e9d6]">
						<Image src={project.image} alt={project.title} fill className="object-cover" />
					</div>
					<p>{project.description}</p>
					<div className="mt-4 flex flex-wrap gap-2">
						{project.tags.map((tag, index) => (
							<StadiumPill key={tag} color={['#e8f5e9', '#fff8e1', '#e3f2fd', '#ffebee'][index % 4]}>
								{tag}
							</StadiumPill>
						))}
					</div>
					<div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
						{project.repo ? (
							<Link className="inline-flex items-center gap-2 rounded-full bg-[#2e7d32] px-4 py-2 text-white" href={project.repo} target="_blank" rel="noreferrer">
								<Github className="h-4 w-4" /> GitHub
							</Link>
						) : null}
						{project.link ? (
							<Link className="inline-flex items-center gap-2 rounded-full border border-[#2e7d32] px-4 py-2 text-[#2e7d32]" href={project.link} target="_blank" rel="noreferrer">
								<ArrowUpRight className="h-4 w-4" /> Live / Demo
							</Link>
						) : null}
					</div>
				</StadiumPanelSection>
			))}
		</div>
	);
}
