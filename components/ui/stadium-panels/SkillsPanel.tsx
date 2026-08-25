'use client';

import { StadiumPanelSection } from '@/components/ui/stadium-panels/panel-shell';
import { skills, type Skill } from '@/lib/constants';

const CATEGORY_LABEL: Record<Skill['category'], string> = {
	technical: 'Language',
	frameworks: 'Framework / Tool',
	soft: 'Strength',
	language: 'Spoken Language',
};

function ratingFromLevel(level: number) {
	return Math.max(1, Math.min(5, Math.round(level / 2)));
}

function dedupeByName(list: Skill[]) {
	const best = new Map<string, Skill>();
	for (const skill of list) {
		const current = best.get(skill.name);
		if (!current || skill.level > current.level) best.set(skill.name, skill);
	}
	return Array.from(best.values());
}

const featured = dedupeByName(skills.filter((skill) => skill.category === 'technical' || skill.category === 'frameworks')).sort(
	(a, b) => b.level - a.level
);

export function SkillsPanel() {
	return (
		<div className="space-y-4">
			<StadiumPanelSection eyebrow="Second Base" title="Scouting Report">
				<p>The core tools I reach for across backend engineering, AI work, systems projects, and product builds.</p>
				<div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
					{featured.map((skill) => (
						<div key={skill.name} className="rounded-2xl border border-[#dcebdc] bg-[#f7fcf7] p-4">
							<p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c7a63]">{CATEGORY_LABEL[skill.category]}</p>
							<p className="mt-1 text-base font-bold text-[#17351f]">{skill.name}</p>
							<div className="mt-3 flex items-center gap-1" aria-label={`${ratingFromLevel(skill.level)} out of 5`}>
								{Array.from({ length: 5 }, (_, index) => (
									<span
										key={index}
										className={`h-1.5 flex-1 rounded-full ${index < ratingFromLevel(skill.level) ? 'bg-[#2e7d32]' : 'bg-[#dcebdc]'}`}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</StadiumPanelSection>
		</div>
	);
}
