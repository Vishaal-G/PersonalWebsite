'use client';

import { useEffect, useRef } from 'react';

import { HIT_HALF_WINDOW, PITCH_DURATION } from '@/lib/pitch-config';
import { useStore } from '@/store/useStore';

export function SwingMeter() {
	const miniGameOpen = useStore((state) => state.miniGameOpen);
	const pitchStartedAt = useStore((state) => state.pitchStartedAt);
	const markerRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<number | null>(null);

	useEffect(() => {
		if (!miniGameOpen) return;

		const tick = () => {
			const elapsed = Date.now() - pitchStartedAt;
			const progress = Math.min(elapsed / (PITCH_DURATION * 1000), 1);
			if (markerRef.current) {
				markerRef.current.style.left = `${progress * 100}%`;
				markerRef.current.style.opacity = elapsed < 0 ? '0' : '1';
			}
			frameRef.current = requestAnimationFrame(tick);
		};
		frameRef.current = requestAnimationFrame(tick);
		return () => {
			if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
		};
	}, [miniGameOpen, pitchStartedAt]);

	if (!miniGameOpen) return null;

	const sweetSpotStart = (1 - HIT_HALF_WINDOW) * 100;
	const sweetSpotWidth = HIT_HALF_WINDOW * 2 * 100;

	return (
		<div className="pointer-events-none flex flex-col items-center gap-2">
			<p className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
				Swing when the marker hits the gold zone
			</p>
			<div className="relative h-4 w-80 max-w-[72vw] overflow-hidden rounded-full bg-black/45 shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]">
				<div className="absolute inset-y-0 rounded-full bg-[#f1c14b]" style={{ left: `${sweetSpotStart}%`, width: `${sweetSpotWidth}%` }} />
				<div
					ref={markerRef}
					className="absolute top-1/2 h-6 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]"
					style={{ left: '0%' }}
				/>
			</div>
		</div>
	);
}
