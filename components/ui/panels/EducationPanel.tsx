'use client';

import { PanelSection } from '@/components/ui/panels/panel-shell';
import { education } from '@/lib/constants';

export function EducationPanel() {
	return (
		<div className="space-y-4">
			{education.map((item) => (
				<PanelSection key={item.degree} eyebrow="Education" title={item.degree}>
					<p className="text-sm text-cyan-300">{item.field}</p>
					<p className="mt-2 text-sm leading-6 text-slate-300">
						{item.institution}, {item.location}
					</p>
					<p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
						{item.startDate} - {item.endDate}
					</p>
					<div className="mt-4 space-y-2">
						{item.achievements.map((achievement) => (
							<div key={achievement} className="rounded-2xl border border-white/8 bg-black/20 p-3 text-sm text-slate-300">
								{achievement}
							</div>
						))}
					</div>
				</PanelSection>
			))}
		</div>
	);
}
