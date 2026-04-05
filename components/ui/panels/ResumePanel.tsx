'use client';

import Link from 'next/link';
import { FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PanelSection, StatChip } from '@/components/ui/panels/panel-shell';
import { education, experiences } from '@/lib/constants';

export function ResumePanel() {
	return (
		<div className="space-y-4">
			<PanelSection eyebrow="Resume" title="Backend, AI, and product-focused engineering.">
				<p className="text-sm leading-6 text-slate-300">
					I&apos;m a Computer Engineering student who likes turning ambitious ideas into systems that are
					both useful and polished. My work usually lives where backend engineering, intelligent tools,
					and design-sensitive interfaces overlap.
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<StatChip label="Current school" value="University of Toronto" />
					<StatChip label="Primary stack" value="Python, FastAPI, React" />
					<StatChip label="Focus" value="AI systems + product engineering" />
				</div>
				<div className="mt-5 flex flex-wrap gap-3">
					<Button asChild>
						<Link href="/Vishaal_Gopalan_Resume.pdf" download>
							Download Resume <FileDown className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/experience">Full Experience Page</Link>
					</Button>
				</div>
			</PanelSection>

			<PanelSection eyebrow="Experience" title="Recent roles">
				<div className="space-y-4">
					{experiences.map((experience) => (
						<div key={experience.title} className="rounded-2xl border border-white/8 bg-black/20 p-4">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<h4 className="font-medium text-white">{experience.title}</h4>
									<p className="text-sm text-cyan-300">{experience.company}</p>
								</div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
									{experience.startDate} - {experience.endDate}
								</p>
							</div>
							<p className="mt-3 text-sm leading-6 text-slate-300">{experience.description[0]}</p>
						</div>
					))}
				</div>
			</PanelSection>

			<PanelSection eyebrow="Education" title="Academic path">
				<div className="space-y-4">
					{education.map((item) => (
						<div key={item.degree} className="rounded-2xl border border-white/8 bg-black/20 p-4">
							<h4 className="font-medium text-white">{item.degree}</h4>
							<p className="mt-1 text-sm text-slate-300">
								{item.field} at {item.institution}
							</p>
						</div>
					))}
				</div>
			</PanelSection>
		</div>
	);
}
