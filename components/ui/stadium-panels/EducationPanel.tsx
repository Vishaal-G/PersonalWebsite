'use client';

import { education } from '@/lib/constants';
import { StadiumPanelSection } from '@/components/ui/stadium-panels/panel-shell';

export function EducationPanel() {
	return (
		<div className="grid gap-4 lg:grid-cols-2">
			{education.map((item, index) => (
				<StadiumPanelSection key={item.degree} title={item.institution}>
					<p className="text-base font-semibold text-[#17351f]">{item.degree}</p>
					<p className="mt-1">{item.field}</p>
					<p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2e7d32]">
						{item.startDate} - {item.endDate}
					</p>
					<div className="mt-4 space-y-2">
						{item.achievements.map((achievement) => (
							<div key={achievement} className="rounded-2xl bg-[#f7fcf7] px-4 py-3">{achievement}</div>
						))}
					</div>
				</StadiumPanelSection>
			))}
		</div>
	);
}
