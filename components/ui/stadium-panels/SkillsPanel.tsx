'use client';

import { StadiumPanelSection, StadiumPill } from '@/components/ui/stadium-panels/panel-shell';
import { skillGroups } from '@/lib/constants';

const PILL_COLORS = ['#e8f5e9', '#fff8e1', '#e3f2fd', '#ffebee'];

export function SkillsPanel() {
	return (
		<div className="space-y-4">
			<StadiumPanelSection eyebrow="Second Base" title="Scouting Report">
				<p>The core tools I reach for across backend engineering, mobile, applied ML, and product builds.</p>
				<div className="mt-5 space-y-5">
					{skillGroups.map((group, groupIndex) => (
						<div key={group.label}>
							<p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c7a63]">{group.label}</p>
							<div className="mt-2 flex flex-wrap gap-2">
								{group.items.map((item) => (
									<StadiumPill key={item} color={PILL_COLORS[groupIndex % PILL_COLORS.length]}>
										{item}
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
