'use client';

import { useEffect, useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';

import { siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function SiteHeader() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
				scrolled || open ? 'border-b border-border/70 bg-background/80 backdrop-blur-xl' : 'border-b border-transparent'
			)}
		>
			<div className="container-page flex h-16 items-center justify-between">
				<a href="#top" className="font-semibold tracking-tight">
					Vishaal Gopalan
				</a>

				<nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
					{siteConfig.nav.map((item) => (
						<a key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
							{item.title}
						</a>
					))}
					<a
						href={siteConfig.links.resume}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
					>
						<FileText className="h-3.5 w-3.5" />
						Resume
					</a>
				</nav>

				<button
					className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:text-foreground md:hidden"
					onClick={() => setOpen((value) => !value)}
					aria-label={open ? 'Close menu' : 'Open menu'}
					aria-expanded={open}
				>
					{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{open ? (
				<nav className="container-page flex flex-col gap-1 pb-5 md:hidden" aria-label="Mobile">
					{siteConfig.nav.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={() => setOpen(false)}
							className="rounded-lg px-2 py-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
						>
							{item.title}
						</a>
					))}
					<a
						href={siteConfig.links.resume}
						target="_blank"
						rel="noreferrer"
						className="rounded-lg px-2 py-2.5 font-medium text-primary hover:bg-secondary"
					>
						Resume
					</a>
				</nav>
			) : null}
		</header>
	);
}
