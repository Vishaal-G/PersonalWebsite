'use client';

import { PanelSection } from '@/components/ui/panels/panel-shell';
import { education } from '@/lib/constants';

export function AchievementsPanel() {
	const achievements = education.flatMap((item) =>
		item.achievements.map((achievement) => ({
			achievement,
			context: `${item.institution} • ${item.endDate}`,
		}))
	);

	return (
		<div className="space-y-4">
			{achievements.map((item) => (
				<PanelSection key={`${item.context}-${item.achievement}`} eyebrow="Recognition" title={item.achievement}>
					<p className="text-sm leading-6 text-slate-300">{item.context}</p>
				</PanelSection>
			))}
		</div>
	);
}
