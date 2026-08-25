'use client';

import Link from 'next/link';

import { getNextPanel, getPanelMeta } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

export function StadiumGuideOverlay() {
	const activePanel = useStore((state) => state.activePanel);
	const panelOpen = useStore((state) => state.panelOpen);
	const miniGameOpen = useStore((state) => state.miniGameOpen);
	const visitedPanels = useStore((state) => state.visitedPanels);
	const setMiniGameOpen = useStore((state) => state.setMiniGameOpen);
	const setInstructionsOpen = useStore((state) => state.setInstructionsOpen);

	if (panelOpen || miniGameOpen) return null;

	const nextBase = getNextPanel(activePanel);
	const nextMeta = nextBase ? getPanelMeta(nextBase) : null;

	return (
		<div className="pointer-events-none absolute inset-0 z-30">
			<div className="absolute left-4 top-4 rounded-full border border-[rgba(229,238,225,0.88)] bg-[rgba(20,45,31,0.84)] px-5 py-3 text-white shadow-[0_24px_48px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md">
				<p className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#eef7ef]">Vishaal Gopalan</p>
			</div>

			<button
				onClick={() => setInstructionsOpen(true)}
				aria-label="Show instructions"
				title="Show instructions"
				className="pointer-events-auto absolute left-4 top-20 grid h-9 w-9 place-items-center rounded-full border border-[rgba(229,238,225,0.88)] bg-[rgba(20,45,31,0.84)] text-sm font-bold text-white shadow-[0_20px_40px_-28px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-[rgba(20,45,31,0.95)]"
			>
				?
			</button>

			<div className="absolute right-4 top-4 max-w-[360px] rounded-full border border-[#d8e4d6] bg-[rgba(249,251,245,0.9)] px-5 py-3 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-sm">
				<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#2d5d39]">
					{nextMeta ? `Next stop: ${nextMeta.label}` : 'Base path complete — you’ve seen it all!'}
				</p>
				<p className="mt-1 text-sm text-[#4a6150]">
					{nextMeta
						? nextBase && visitedPanels.includes(nextBase)
							? `Click the ${nextMeta.label.toLowerCase()} sign anytime — it's already unlocked.`
							: `Hit Play Ball below and swing to reach ${nextMeta.label}. Already-visited signs can be clicked anytime.`
						: 'Feel free to revisit any base, or say hello from the contact dugout.'}
				</p>
			</div>

			<Link
				href="/fallback"
				className="pointer-events-auto absolute bottom-4 left-4 rounded-full border border-[#d8e4d6] bg-[rgba(249,251,245,0.9)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2d5d39] shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:bg-white"
			>
				Skip to simple view →
			</Link>

			<button
				onClick={() => setMiniGameOpen(true)}
				className="pointer-events-auto absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#f1c14b] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.24em] text-[#4a340c] shadow-[0_20px_44px_-20px_rgba(241,193,75,0.85)] transition hover:brightness-105 active:scale-95"
			>
				⚾ Play Ball
			</button>
		</div>
	);
}
