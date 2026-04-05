'use client';

import { StadiumPanelSection, StadiumPill } from '@/components/ui/stadium-panels/panel-shell';
import { experiences } from '@/lib/constants';

export function AboutPanel() {
	const highlightedExperience = experiences.slice(0, 2);

	return (
		<div className="space-y-4">
			<StadiumPanelSection eyebrow="First Base" title="About Me">
				<p>
					I&apos;m a Computer Engineering student at the University of Toronto who likes building intelligent tools, strong backend
					systems, and interfaces that feel polished instead of purely functional.
				</p>
				<p className="mt-3">
					My work usually sits at the intersection of AI, applied engineering, and product thinking. I like ambitious ideas that
					can still ship cleanly.
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<StadiumPill color="#e3f2fd">US/Canadian Citizen</StadiumPill>
					<StadiumPill color="#fff8e1">Computer Engineering</StadiumPill>
					<StadiumPill color="#ffebee">Backend + AI</StadiumPill>
				</div>
			</StadiumPanelSection>

			<StadiumPanelSection eyebrow="Experience Snapshot" title="Internship + Leadership">
				<div className="grid gap-3 md:grid-cols-2">
					{highlightedExperience.map((experience) => (
						<div key={`${experience.company}-${experience.title}`} className="rounded-[1.75rem] border border-[#d8e5d3] bg-white/88 p-5">
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-[#193322]">{experience.title}</h3>
								<p className="text-sm font-medium uppercase tracking-[0.28em] text-[#3a744f]">{experience.company}</p>
								<p className="text-sm text-[#5a735f]">
									{experience.startDate} - {experience.endDate}
								</p>
								<p className="text-sm text-[#5a735f]">{experience.location}</p>
							</div>
							<p className="mt-3 text-base leading-7 text-[#3f5d49]">{experience.description[0]}</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{experience.technologies.slice(0, 4).map((technology) => (
									<StadiumPill key={technology} color="#edf7ee">
										{technology}
									</StadiumPill>
								))}
							</div>
						</div>
					))}
				</div>
			</StadiumPanelSection>
		</div>
	);
}
