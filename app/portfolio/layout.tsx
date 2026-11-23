import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Portfolio',
	description: 'Vishaal Gopalan’s portfolio: experience, projects, skills, and contact, in a simple scrolling page.',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
	return children;
}
