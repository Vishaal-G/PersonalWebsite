'use client';

import dynamic from 'next/dynamic';

const SiteBackground = dynamic(
	() => import('@/components/scene/site-background').then((module) => module.SiteBackground),
	{ ssr: false }
);

export function SiteBackgroundShell() {
	return <SiteBackground />;
}
