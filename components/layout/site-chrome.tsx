'use client';

import { usePathname } from 'next/navigation';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { SiteBackgroundShell } from '@/components/scene/site-background-shell';

export function SiteChrome({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const immersiveHome = pathname === '/';

	return (
		<div className="site-shell">
			{!immersiveHome && (
				<>
					<div className="site-gradient" />
					<div className="site-grid" />
					<SiteBackgroundShell />
				</>
			)}
			<div className="relative z-10 flex min-h-screen flex-col">
				{!immersiveHome && <Navbar />}
				<main className={immersiveHome ? 'flex-grow' : 'flex-grow pt-24'}>{children}</main>
				{!immersiveHome && <Footer />}
			</div>
		</div>
	);
}
