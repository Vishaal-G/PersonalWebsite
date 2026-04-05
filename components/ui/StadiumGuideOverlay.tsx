'use client';

import type { PanelKey } from '@/types';
import { getPanelMeta } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

const BASE_PATH: Exclude<PanelKey, null>[] = ['hero', 'about', 'skills', 'projects'];

function getNextBase(activePanel: PanelKey) {
	if (!activePanel) return BASE_PATH[0];
	const index = BASE_PATH.indexOf(activePanel);
	return index >= 0 && index < BASE_PATH.length - 1 ? BASE_PATH[index + 1] : null;
}

export function StadiumGuideOverlay() {
	const activePanel = useStore((state) => state.activePanel);
	const panelOpen = useStore((state) => state.panelOpen);

	if (panelOpen) return null;

	const nextBase = getNextBase(activePanel);
	const nextMeta = nextBase ? getPanelMeta(nextBase) : null;

	return (
		<div className="pointer-events-none absolute inset-0 z-30">
			<div className="absolute left-4 top-4 rounded-full border border-[rgba(229,238,225,0.88)] bg-[rgba(20,45,31,0.84)] px-5 py-3 text-white shadow-[0_24px_48px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md">
				<p className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#eef7ef]">Vishaal Gopalan</p>
			</div>

			<div className="absolute right-4 top-4 max-w-[360px] rounded-full border border-[#d8e4d6] bg-[rgba(249,251,245,0.9)] px-5 py-3 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-sm">
				<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#2d5d39]">
					{nextMeta ? `Next stop: ${nextMeta.label}` : 'Base path complete'}
				</p>
				<p className="mt-1 text-sm text-[#4a6150]">
					{nextMeta
						? `Click the ${nextMeta.label.toLowerCase()} sign to move the avatar there.`
						: 'Finish the field with the mound, outfield, and contact dugout.'}
				</p>
			</div>
		</div>
	);
}
