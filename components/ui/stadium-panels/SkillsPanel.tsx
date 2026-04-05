'use client';

import { Star } from 'lucide-react';

import { StadiumPanelSection } from '@/components/ui/stadium-panels/panel-shell';

type LineupEntry = {
	position: string;
	name: string;
	stars: number;
};

const lineup: LineupEntry[] = [
	{ position: 'P', name: 'Python', stars: 5 },
	{ position: 'C', name: 'JavaScript', stars: 5 },
	{ position: '1B', name: 'Java', stars: 4 },
	{ position: '2B', name: 'C++', stars: 4 },
	{ position: '3B', name: 'Verilog', stars: 3 },
	{ position: 'SS', name: 'C', stars: 3 },
	{ position: 'LF', name: 'PyTorch', stars: 3 },
	{ position: 'CF', name: 'React', stars: 4 },
	{ position: 'RF', name: 'ROS', stars: 3 },
];

function StarRating({ stars }: { stars: number }) {
	return (
		<div className="flex items-center gap-1" aria-label={`${stars} out of 5 stars`}>
			{Array.from({ length: 5 }, (_, index) => {
				const filled = index < stars;
				return (
					<Star
						key={index}
						className={`h-4 w-4 md:h-5 md:w-5 ${filled ? 'text-[#f0c85a]' : 'text-[#d8dfd8]'}`}
						fill={filled ? 'currentColor' : 'none'}
						strokeWidth={1.8}
						aria-hidden
					/>
				);
			})}
		</div>
	);
}

export function SkillsPanel() {
	return (
		<div className="space-y-4">
			<StadiumPanelSection eyebrow="Second Base" title="Skills Snapshot">
				<p>I have experience in these technologies across backend engineering, AI work, systems projects, and product builds.</p>
				<div className="mt-5 overflow-hidden rounded-[1.4rem] border border-[#dcebdc]">
					<div className="grid grid-cols-[72px_1fr_132px] bg-[#2e7d32] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white md:grid-cols-[88px_1fr_170px]">
						<span>Pos</span>
						<span>Skill</span>
						<span>Stars</span>
					</div>
					{lineup.map((skill, index) => (
						<div
							key={`${skill.position}-${skill.name}`}
							className={`grid grid-cols-[72px_1fr_132px] items-center gap-2 px-4 py-3 text-sm md:grid-cols-[88px_1fr_170px] md:text-base ${
								index % 2 === 0 ? 'bg-[#f7fcf7]' : 'bg-white'
							}`}
						>
							<span className="font-bold uppercase tracking-[0.12em] text-[#2e7d32]">{skill.position}</span>
							<span className="font-semibold text-[#17351f]">{skill.name}</span>
							<StarRating stars={skill.stars} />
						</div>
					))}
				</div>
			</StadiumPanelSection>
		</div>
	);
}
