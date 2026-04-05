import { Github, GraduationCap, type LucideIcon, Landmark, LayoutDashboard, Linkedin, Mail, Trophy, UserCircle2 } from 'lucide-react';

import type { PanelKey } from '@/types';

export type StadiumPanelKey = Extract<PanelKey, 'hero' | 'projects' | 'skills' | 'about' | 'experience' | 'education' | 'contact'>;
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

export const stadiumPanels: StadiumPanelMeta[] = [
	{
		key: 'hero',
		label: 'Home Plate',
		subtitle: 'Start here for the intro, overall identity, and quick links.',
		scoreboardCall: 'AT THE PLATE: INTRO',
		icon: Trophy,
		focus: { position: [0, 4.1, 15.2], target: [0, 0.55, 10.6] },
	},
	{
		key: 'projects',
		label: 'Third Base',
		subtitle: 'Featured builds and project work on the left side of the diamond.',
		scoreboardCall: 'ROUNDING THIRD: PROJECTS',
		icon: LayoutDashboard,
		focus: { position: [-8.2, 3.4, 10.6], target: [-4.7, 0.7, 5.2] },
	},
	{
		key: 'skills',
		label: 'Second Base',
		subtitle: 'Skills and technologies I use regularly across backend, AI, and product work.',
		scoreboardCall: 'ON SECOND: SKILLS',
		icon: LayoutDashboard,
		focus: { position: [1.8, 3.7, 5.8], target: [0.32, 0.8, 0.92] },
	},
	{
		key: 'about',
		label: 'First Base',
		subtitle: 'The personal side: background, personality, and what drives the work.',
		scoreboardCall: 'ON FIRST: ABOUT',
		icon: UserCircle2,
		focus: { position: [8.2, 3.4, 10.6], target: [4.7, 0.7, 5.2] },
	},
	{
		key: 'education',
		label: "Pitcher's Mound",
		subtitle: 'Education and milestones centered on the mound so they stay in the middle of the field journey.',
		icon: GraduationCap,
		scoreboardCall: 'ON THE MOUND: EDUCATION',
		focus: { position: [0, 2.7, 8.7], target: [0, 0.56, 4.08] },
	},
	{
		key: 'experience',
		label: 'Outfield',
		subtitle: 'Internship and leadership experience highlighted across the center outfield.',
		scoreboardCall: 'OUTFIELD: EXPERIENCE',
		icon: Landmark,
		focus: { position: [0, 6.6, 2.8], target: [0, 5.05, -8.95] },
	},
	{
		key: 'contact',
		label: 'Contact Dugout',
		subtitle: 'A small on-field contact stop for email, socials, and direct messages.',
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
