'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import { SwingMeter } from '@/components/ui/SwingMeter';
import { getNextPanel, getPanelMeta } from '@/lib/stadium-data';
import { isSfxMuted, setSfxMuted } from '@/lib/sfx';
import { useStore } from '@/store/useStore';

const FEEDBACK_HEADLINE: Record<'hit' | 'early' | 'late' | 'no-swing', string> = {
	hit: 'Nice hit!',
	early: 'Swung too early',
	late: 'Swung too late',
	'no-swing': 'Strike — you didn’t swing',
};

const FEEDBACK_HINT: Record<'early' | 'late' | 'no-swing', string> = {
	early: 'Wait for the marker to reach the gold zone before you swing.',
	late: 'Swing a little sooner, right as the marker hits the gold zone.',
	'no-swing': 'Tap Swing (or press space) when the marker hits the gold zone.',
};

export function PlayBallOverlay() {
	const miniGameOpen = useStore((state) => state.miniGameOpen);
	const panelOpen = useStore((state) => state.panelOpen);
	const activePanel = useStore((state) => state.activePanel);
	const swingFeedback = useStore((state) => state.swingFeedback);
	const requestSwing = useStore((state) => state.requestSwing);
	const setMiniGameOpen = useStore((state) => state.setMiniGameOpen);
	const [muted, setMuted] = useState(isSfxMuted());

	const toggleMuted = () => {
		const next = !muted;
		setMuted(next);
		setSfxMuted(next);
	};

	if (!miniGameOpen || panelOpen) return null;

	const nextKey = getNextPanel(activePanel);
	const nextMeta = nextKey ? getPanelMeta(nextKey) : null;

	return (
		<div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-between px-4 py-8">
			<div className="pointer-events-auto flex items-center gap-4 rounded-full border border-[#d8e4d6] bg-[rgba(249,251,245,0.94)] px-5 py-3 shadow-[0_24px_56px_-28px_rgba(0,0,0,0.45)] backdrop-blur-md">
				<div>
					<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#2d5d39]">Play Ball</p>
					<p className="mt-1 text-sm text-[#4a6150]">
						{nextMeta ? `Swing to reach ${nextMeta.label}` : 'Swing away — every base is covered!'}
					</p>
				</div>
				<button
					onClick={toggleMuted}
					aria-label={muted ? 'Unmute sound' : 'Mute sound'}
					title={muted ? 'Unmute sound' : 'Mute sound'}
					className="shrink-0 grid h-8 w-8 place-items-center rounded-full border border-[#c8d6c8] text-[#4a6150] transition hover:border-[#2d5d39] hover:text-[#2d5d39]"
				>
					{muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
				</button>
				<button
					onClick={() => setMiniGameOpen(false)}
					className="shrink-0 rounded-full border border-[#c8d6c8] px-3 py-1.5 text-xs font-semibold text-[#4a6150] transition hover:border-[#2d5d39] hover:text-[#2d5d39]"
				>
					Exit
				</button>
			</div>

			<div className="pointer-events-none flex flex-col items-center gap-4">
				<SwingMeter />
				{swingFeedback ? (
					<div
						className={`rounded-full px-6 py-2 text-lg font-black uppercase tracking-[0.1em] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] ${
							swingFeedback === 'hit' ? 'bg-[#2d5d39] text-white' : 'bg-[#c0392b] text-white'
						}`}
					>
						{FEEDBACK_HEADLINE[swingFeedback]}
					</div>
				) : null}
				{swingFeedback && swingFeedback !== 'hit' ? (
					<p className="rounded-full bg-black/40 px-4 py-1 text-xs font-semibold text-white backdrop-blur-sm">{FEEDBACK_HINT[swingFeedback]}</p>
				) : null}
			</div>

			<div className="pointer-events-auto flex flex-col items-center gap-3">
				<p className="rounded-full bg-black/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
					Tap Swing, press space, or click right as the marker hits the gold zone
				</p>
				<button
					onClick={requestSwing}
					className="rounded-full bg-[#f1c14b] px-10 py-3.5 text-sm font-black uppercase tracking-[0.2em] text-[#4a340c] shadow-[0_20px_50px_-20px_rgba(241,193,75,0.85)] transition active:scale-95"
				>
					Swing
				</button>
			</div>
		</div>
	);
}
