'use client';

import { roomObjects } from '@/lib/immersive-room';
import { useStore } from '@/store/useStore';

export function Crosshair() {
	const { hasEntered, hoveredObject, overlayVisible } = useStore();
	const hoveredMeta = roomObjects.find((object) => object.id === hoveredObject);

	if (!hasEntered || overlayVisible) {
		return null;
	}

	return (
		<>
			<div
				className={`pointer-events-none absolute left-1/2 top-1/2 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ${
					hoveredObject ? 'border-cyan-300 shadow-[0_0_24px_rgba(6,182,212,0.35)]' : 'border-white/40'
				}`}
			>
				<div className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/60" />
				<div className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/60" />
			</div>
			{hoveredMeta && (
				<div className="pointer-events-none absolute left-1/2 top-[calc(50%+1.6rem)] z-20 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-black/45 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-cyan-200 backdrop-blur-md">
					{hoveredMeta.title} - {hoveredMeta.shortLabel}
				</div>
			)}
		</>
	);
}
