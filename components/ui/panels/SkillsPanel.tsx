'use client';

import { PanelSection } from '@/components/ui/panels/panel-shell';
import { skills } from '@/lib/constants';

const groups = [
	{ title: 'Technical', key: 'technical' },
	{ title: 'Frameworks', key: 'frameworks' },
	{ title: 'Soft Skills', key: 'soft' },
	{ title: 'Languages', key: 'language' },
] as const;

export function SkillsPanel() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			{groups.map((group) => (
				<PanelSection key={group.key} eyebrow="Skills" title={group.title}>
					<div className="space-y-3">
						{skills
							.filter((skill) => skill.category === group.key)
							.map((skill) => (
								<div key={`${group.key}-${skill.name}`} className="rounded-2xl border border-white/8 bg-black/20 p-3">
									<div className="flex items-center justify-between gap-3 text-sm">
										<span className="font-medium text-white">{skill.name}</span>
										<span className="text-slate-400">{skill.level}/10</span>
									</div>
									<div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
										<div
											className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-amber-300"
											style={{ width: `${skill.level * 10}%` }}
										/>
									</div>
								</div>
							))}
					</div>
				</PanelSection>
			))}
		</div>
	);
}
