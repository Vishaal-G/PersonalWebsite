'use client';

import Link from 'next/link';
import { Laptop, NotebookPen, StickyNote, UserRound, MessageSquare, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';

const fallbackCards = [
	{
		title: 'Projects',
		description: 'Explore featured builds, demos, and GitHub links.',
		href: '/projects',
		icon: <Laptop className="h-5 w-5" />,
	},
	{
		title: 'Resume',
		description: 'Open the downloadable resume and get the fast summary.',
		href: '/Vishaal_Gopalan_Resume.pdf',
		icon: <NotebookPen className="h-5 w-5" />,
		download: true,
	},
	{
		title: 'Skills',
		description: 'See languages, frameworks, tools, and communication strengths.',
		href: '/skills',
		icon: <StickyNote className="h-5 w-5" />,
	},
	{
		title: 'About',
		description: 'Read the bio, current focus, and engineering direction.',
		href: '/about',
		icon: <UserRound className="h-5 w-5" />,
	},
	{
		title: 'Education',
		description: 'Degree details, school background, and achievements.',
		href: '/education',
		icon: <GraduationCap className="h-5 w-5" />,
	},
	{
		title: 'Contact',
		description: 'Reach out directly with the live contact flow.',
		href: '/contact',
		icon: <MessageSquare className="h-5 w-5" />,
	},
];

export function FallbackOverview({ inHome = false }: { inHome?: boolean }) {
	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<div className="section-shell">
					<p className="text-xs uppercase tracking-[0.28em] text-primary">Fallback Experience</p>
					<h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
						A streamlined version of the portfolio for smaller screens and lower-motion sessions.
					</h1>
					<p className="mt-5 max-w-3xl text-muted-foreground">
						The immersive room is optimized for larger desktop exploration. This fallback keeps the same
						content accessible when the 3D environment would feel cramped or unnecessarily heavy.
					</p>
					{inHome && (
						<Button className="mt-6" variant="outline" asChild>
							<Link href="/">Try the Room View</Link>
						</Button>
					)}

					<div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
						{fallbackCards.map((card) => (
							<Link
								key={card.title}
								href={card.href}
								{...(card.download ? { download: true } : {})}
								className="depth-card rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition-transform duration-300 hover:-translate-y-1"
							>
								<div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-primary">
									{card.icon}
								</div>
								<h2 className="mt-5 text-xl font-semibold">{card.title}</h2>
								<p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
