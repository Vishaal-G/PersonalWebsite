'use client';

import type { ReactNode } from 'react';

export function PanelSection({
	title,
	eyebrow,
	children,
}: {
	title?: string;
	eyebrow?: string;
	children: ReactNode;
}) {
	return (
		<section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.9)]">
			{eyebrow ? <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">{eyebrow}</p> : null}
			{title ? <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3> : null}
			<div className={title || eyebrow ? 'mt-3' : ''}>{children}</div>
		</section>
	);
}

export function StatChip({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200">
			<span className="text-slate-400">{label}</span> {value}
		</div>
	);
}
