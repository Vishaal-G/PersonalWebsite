import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { siteConfig } from '@/lib/constants';

import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const description =
	'Computer Engineering student at the University of Toronto. Software engineering intern at CIBC and Solaris, building backend systems, iOS clients, and applied ML tools.';

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: 'Vishaal Gopalan',
		template: '%s · Vishaal Gopalan',
	},
	description,
	openGraph: {
		title: 'Vishaal Gopalan',
		description,
		type: 'website',
		url: siteConfig.url,
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Vishaal Gopalan',
		description,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${sans.variable} ${mono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
