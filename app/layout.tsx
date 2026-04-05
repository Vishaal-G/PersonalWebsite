import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
	title: 'Vishaal Gopalan',
	description: 'A 3D baseball stadium portfolio.',
	openGraph: {
		title: 'Vishaal Gopalan - Portfolio',
		description: 'A 3D baseball stadium you can explore.',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
