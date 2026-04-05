'use client';

import type { ReactNode } from 'react';

export function StadiumPanelSection({
	title,
	eyebrow,
	children,
}: {
	title: string;
	eyebrow?: string;
	children: ReactNode;
}) {
	return (
		<section className="rounded-[1.75rem] border border-[#d6e9d6] bg-white p-5 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.35)]">
			{eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#2e7d32]">{eyebrow}</p> : null}
			<h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#17351f]">{title}</h3>
			<div className="mt-4 text-sm leading-6 text-[#3e5b45]">{children}</div>
		</section>
	);
}

export function StadiumPill({ children, color = '#e8f5e9' }: { children: ReactNode; color?: string }) {
	return (
		<span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#17351f]" style={{ background: color }}>
			{children}
		</span>
	);
}
