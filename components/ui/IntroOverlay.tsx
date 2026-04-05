'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useStore } from '@/store/useStore';

export function IntroOverlay() {
	const { introVisible, setIntroVisible } = useStore();

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setIntroVisible(false);
		}, 2500);

		return () => window.clearTimeout(timer);
	}, [setIntroVisible]);

	return (
		<AnimatePresence>
			{introVisible ? (
				<motion.div
					className="fixed inset-0 z-40 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(38,70,110,0.35),transparent_36%),linear-gradient(180deg,rgba(4,7,12,0.86),rgba(4,7,12,0.96))] px-6 backdrop-blur-[4px]"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.55, ease: 'easeInOut' }}
					onClick={() => setIntroVisible(false)}
				>
					<div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_30px_120px_-40px_rgba(0,0,0,0.98)] backdrop-blur-xl">
						<p className="text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">Orbit Desk Portfolio</p>
						<h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
							Vishaal Gopalan
						</h1>
						<p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
							Drag to orbit the desk. Hover over objects to see what they open. Click any object to pull it
							into focus and step into that part of the portfolio.
						</p>
						<p className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-400">
							Tap anywhere to skip
						</p>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
