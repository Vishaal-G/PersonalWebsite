import {
	Award,
	BriefcaseBusiness,
	Coffee,
	type LucideIcon,
	GraduationCap,
	Laptop,
	MessageSquare,
	Newspaper,
	NotebookPen,
	StickyNote,
	UserRound,
} from 'lucide-react';

export type PortfolioObjectId =
	| 'projects'
	| 'resume'
	| 'skills'
	| 'about'
	| 'hobbies'
	| 'education'
	| 'contact'
	| 'blog'
	| 'achievements'
	| 'awards'
	| 'experience';

export type RoomObjectMeta = {
	id: PortfolioObjectId;
	title: string;
	shortLabel: string;
	hint: string;
	icon: LucideIcon;
	mapPosition: {
		left: string;
		top: string;
	};
};

export const roomObjects: RoomObjectMeta[] = [
	{
		id: 'projects',
		title: 'Laptop',
		shortLabel: 'Projects',
		hint: 'Featured builds, demos, and repos.',
		icon: Laptop,
		mapPosition: { left: '49%', top: '48%' },
	},
	{
		id: 'resume',
		title: 'Notebook',
		shortLabel: 'Resume',
		hint: 'Resume summary and download access.',
		icon: NotebookPen,
		mapPosition: { left: '61%', top: '50%' },
	},
	{
		id: 'skills',
		title: 'Sticky Notes',
		shortLabel: 'Skills',
		hint: 'Languages, frameworks, and strengths.',
		icon: StickyNote,
		mapPosition: { left: '38%', top: '52%' },
	},
	{
		id: 'about',
		title: 'Photo Frame',
		shortLabel: 'About',
		hint: 'Bio, personality, and current focus.',
		icon: UserRound,
		mapPosition: { left: '41%', top: '43%' },
	},
	{
		id: 'hobbies',
		title: 'Coffee Mug',
		shortLabel: 'Fun',
		hint: 'Interests and creative experiments.',
		icon: Coffee,
		mapPosition: { left: '53%', top: '58%' },
	},
	{
		id: 'experience',
		title: 'Desk Lamp',
		shortLabel: 'Experience',
		hint: 'Professional roles and impact.',
		icon: BriefcaseBusiness,
		mapPosition: { left: '66%', top: '44%' },
	},
	{
		id: 'contact',
		title: 'Business Cards',
		shortLabel: 'Contact',
		hint: 'Reach out by form, email, or socials.',
		icon: MessageSquare,
		mapPosition: { left: '55%', top: '63%' },
	},
	{
		id: 'blog',
		title: 'Bookshelf',
		shortLabel: 'Blog',
		hint: 'Writing and technical notes.',
		icon: Newspaper,
		mapPosition: { left: '19%', top: '27%' },
	},
	{
		id: 'achievements',
		title: 'Trophy',
		shortLabel: 'Achievements',
		hint: 'Recognition and achievements.',
		icon: Award,
		mapPosition: { left: '76%', top: '28%' },
	},
	{
		id: 'education',
		title: 'Diploma',
		shortLabel: 'Education',
		hint: 'Degree path and school timeline.',
		icon: GraduationCap,
		mapPosition: { left: '67%', top: '30%' },
	},
];
