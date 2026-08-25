'use client';

import { useStore } from '@/store/useStore';

export function StadiumControlsLegend() {
	const instructionsOpen = useStore((state) => state.instructionsOpen);
	const setInstructionsOpen = useStore((state) => state.setInstructionsOpen);

	const dismiss = () => setInstructionsOpen(false);

	if (!instructionsOpen) return null;

	return (
		<div className="pointer-events-auto absolute inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-[2px]">
			<div className="w-full max-w-md rounded-[1.8rem] border border-[#d8e4d6] bg-[#f9fbf5] p-6 text-center shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] sm:p-8">
				<p className="text-3xl">⚾</p>
				<h2 className="mt-3 text-xl font-bold text-[#1a3323]">Welcome to Vishaal&apos;s ballpark</h2>
				<ul className="mt-5 space-y-3 text-left text-sm text-[#3f5c46]">
					<li>
						<span className="font-bold text-[#2d5d39]">Look around —</span> drag to orbit, scroll or pinch to zoom.
					</li>
					<li>
						<span className="font-bold text-[#2d5d39]">To move base to base —</span> hit the Play Ball button and swing when the
						marker hits the gold zone. That&apos;s the only way to learn more about me.
					</li>
					<li>
						<span className="font-bold text-[#2d5d39]">Already been there? —</span> click any base you&apos;ve unlocked anytime to
						look again.
					</li>
					<li>
						<span className="font-bold text-[#2d5d39]">Just want to read? —</span> use &quot;Skip to simple view&quot; in the corner
						— you can learn everything about me without playing the game.
					</li>
				</ul>
				<button
					onClick={dismiss}
					className="mt-6 w-full rounded-full bg-[#2d5d39] px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#234a2d]"
				>
					Got it — let&apos;s play
				</button>
			</div>
		</div>
	);
}
