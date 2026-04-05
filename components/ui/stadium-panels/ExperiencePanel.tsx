'use client';

import { experiences } from '@/lib/constants';
import { StadiumPanelSection, StadiumPill } from '@/components/ui/stadium-panels/panel-shell';

export function ExperiencePanel() {
	return (
		<div className="space-y-4">
			{experiences.map((experience, index) => (
				<StadiumPanelSection key={experience.title} eyebrow={`Outfield Section ${index + 1}`} title={`${experience.company} - ${experience.title}`}>
					<p className="font-medium text-[#2e7d32]">
						{experience.startDate} - {experience.endDate} | {experience.location}
					</p>
					<ul className="mt-3 space-y-2">
						{experience.description.map((bullet) => (
							<li key={bullet} className="rounded-2xl bg-[#f7fcf7] px-4 py-3">
								{bullet}
							</li>
						))}
					</ul>
					<div className="mt-4 flex flex-wrap gap-2">
						{experience.technologies.map((tech, techIndex) => (
							<StadiumPill key={tech} color={['#e8f5e9', '#fff8e1', '#e3f2fd'][techIndex % 3]}>
								{tech}
							</StadiumPill>
						))}
					</div>
				</StadiumPanelSection>
			))}
		</div>
	);
}
