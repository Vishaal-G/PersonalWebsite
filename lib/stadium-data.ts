import { Github, type LucideIcon, Landmark, LayoutDashboard, Linkedin, Mail, Trophy, UserCircle2 } from 'lucide-react';

import type { PanelKey } from '@/types';

export type StadiumPanelKey = Extract<PanelKey, 'about' | 'skills' | 'projects' | 'hero' | 'contact'>;
export type StadiumActionKey = 'github' | 'linkedin' | 'resume' | 'coffee';

export type FocusPreset = {
	position: [number, number, number];
	target: [number, number, number];
};

export type StadiumPanelMeta = {
	key: StadiumPanelKey;
	label: string;
	subtitle: string;
	scoreboardCall: string;
	icon: LucideIcon;
	focus: FocusPreset;
};

export const defaultCamera: FocusPreset = {
	position: [0, 7.4, 19.2],
	target: [0, 1.2, 6.2],
};

export const introCamera: FocusPreset = {
	position: [0, 24, 42],
	target: [0, 4, 8],
};

export const stadiumPanels: StadiumPanelMeta[] = [
	{
		key: 'about',
		label: 'First Base',
		subtitle: "The person behind the code — my background and what I'm studying.",
		scoreboardCall: 'ON FIRST: ABOUT',
		icon: UserCircle2,
		focus: { position: [8.2, 3.4, 10.6], target: [4.7, 0.7, 5.2] },
	},
	{
		key: 'skills',
		label: 'Second Base',
		subtitle: 'The languages, frameworks, and tools I reach for most.',
		scoreboardCall: 'ON SECOND: SKILLS',
		icon: LayoutDashboard,
		focus: { position: [1.8, 3.7, 5.8], target: [0.32, 0.8, 0.92] },
	},
	{
		key: 'projects',
		label: 'Third Base',
		subtitle: "A few things I've built that I'm proud of.",
		scoreboardCall: 'ROUNDING THIRD: PROJECTS',
		icon: LayoutDashboard,
		focus: { position: [-8.2, 3.4, 10.6], target: [-4.7, 0.7, 5.2] },
	},
	{
		key: 'hero',
		label: 'Home Base',
		subtitle: "Safe at home — where I've worked and what I've led.",
		scoreboardCall: 'SAFE AT HOME: EXPERIENCE',
		icon: Landmark,
		focus: { position: [0, 4.1, 15.2], target: [0, 0.55, 10.6] },
	},
	{
		key: 'contact',
		label: 'Contact Dugout',
		subtitle: "Let's talk — here's how to reach me.",
		scoreboardCall: 'SCOREBOARD: CONTACT',
		icon: Mail,
		focus: { position: [10.6, 3.1, 13.2], target: [7.2, 0.85, 9.3] },
	},
];

export const stadiumActions: Record<StadiumActionKey, { label: string; subtitle: string; icon: LucideIcon }> = {
	github: { label: 'Left Field Sign', subtitle: 'Open GitHub profile in a new tab.', icon: Github },
	linkedin: { label: 'Right Field Sign', subtitle: 'Open LinkedIn profile in a new tab.', icon: Linkedin },
	resume: { label: 'On-Deck Circle', subtitle: 'Download the resume PDF.', icon: Trophy },
	coffee: { label: 'Dugout Coffee', subtitle: 'A little personality tucked beside the bench.', icon: Mail },
};

export function getPanelMeta(key: string | null) {
	return stadiumPanels.find((panel) => panel.key === key);
}

export const JOURNEY: StadiumPanelKey[] = ['about', 'skills', 'projects', 'hero', 'contact'];

export function getNextPanel(key: PanelKey): PanelKey {
	if (!key) return JOURNEY[0];
	const index = JOURNEY.indexOf(key as StadiumPanelKey);
	return index >= 0 && index < JOURNEY.length - 1 ? JOURNEY[index + 1] : null;
}
