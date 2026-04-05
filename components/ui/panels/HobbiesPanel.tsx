'use client';

import { PanelSection } from '@/components/ui/panels/panel-shell';

const hobbies = [
	'Building side projects that mix AI, music, robotics, and interface design.',
	'Exploring product ideas that feel a little too ambitious before they become real.',
	'Writing, tinkering, and learning new tools deeply enough to make them useful.',
];

export function HobbiesPanel() {
	return (
		<div className="space-y-4">
			<PanelSection eyebrow="Beyond Work" title="The coffee mug is the curiosity panel.">
				<p className="text-sm leading-6 text-slate-300">
					I like the part of engineering where experimentation still feels playful. The most fun projects
					usually start as a weird idea, then slowly turn into something people can actually use.
				</p>
			</PanelSection>
			<PanelSection title="Current interests">
				<div className="space-y-3">
					{hobbies.map((hobby) => (
						<div key={hobby} className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-6 text-slate-300">
							{hobby}
						</div>
					))}
				</div>
			</PanelSection>
		</div>
	);
}
