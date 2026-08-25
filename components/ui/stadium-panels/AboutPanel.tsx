'use client';

import { StadiumPanelSection, StadiumPill } from '@/components/ui/stadium-panels/panel-shell';
import { education } from '@/lib/constants';

export function AboutPanel() {
	const current = education[0];

	return (
		<div className="space-y-4">
			<StadiumPanelSection eyebrow="First Base" title="About Me">
				<p>
					I&apos;m a Computer Engineering student at the University of Toronto, minoring in Artificial Intelligence
					Engineering. I like building intelligent tools, strong backend systems, and interfaces that feel polished
					instead of purely functional.
				</p>
				<p className="mt-3">
					My work usually sits at the intersection of AI, applied engineering, and product thinking. I like ambitious ideas
					that can still ship cleanly.
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<StadiumPill color="#fff8e1">Computer Engineering</StadiumPill>
					<StadiumPill color="#e3f2fd">AI Minor</StadiumPill>
					<StadiumPill color="#ffebee">Backend + AI</StadiumPill>
					<StadiumPill color="#e8f5e9">US/Canadian Citizen</StadiumPill>
				</div>
			</StadiumPanelSection>

			<StadiumPanelSection eyebrow="Currently" title="What I'm Studying">
				<p className="text-base font-semibold text-[#17351f]">{current.institution}</p>
				<p className="mt-1">
					{current.degree} — {current.field}
				</p>
				{current.minor ? <p className="mt-1 text-[#3e5b45]">Minor in {current.minor}</p> : null}
				<p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2e7d32]">
					{current.startDate} - {current.endDate}
				</p>
				<div className="mt-4 space-y-2">
					{current.achievements.map((achievement) => (
						<div key={achievement} className="rounded-2xl bg-[#f7fcf7] px-4 py-3">
							{achievement}
						</div>
					))}
				</div>
			</StadiumPanelSection>
		</div>
	);
}
