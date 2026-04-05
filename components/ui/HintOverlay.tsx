'use client';

import { useStore } from '@/store/useStore';

export function HintOverlay() {
	const { hasEntered, overlayVisible } = useStore();

	if (!hasEntered || overlayVisible) {
		return null;
	}

	return (
		<div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-300 backdrop-blur-xl">
			WASD &nbsp; Mouse &nbsp; ESC
		</div>
	);
}
