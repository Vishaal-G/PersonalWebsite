import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SiteBackgroundShell } from '@/components/scene/site-background-shell';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Engineering Portfolio',
	description: 'A professional portfolio website for engineering students.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<link rel="shortcut icon" href="https://cdn-icons-png.freepik.com/256/12539/12539811.png" type="image/x-icon" />
			<body className={spaceGrotesk.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					<div className="site-shell">
						<div className="site-gradient" />
						<div className="site-grid" />
						<SiteBackgroundShell />
						<div className="relative z-10 flex min-h-screen flex-col">
							<Navbar />
							<main className="flex-grow pt-24">{children}</main>
							<Footer />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
