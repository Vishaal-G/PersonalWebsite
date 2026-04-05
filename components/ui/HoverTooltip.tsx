'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { roomObjects } from '@/lib/immersive-room';
import { useStore } from '@/store/useStore';

export function HoverTooltip() {
	const { hoveredKey, panelOpen, introVisible } = useStore();
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = (event: PointerEvent) => {
			setPosition({ x: event.clientX + 18, y: event.clientY + 18 });
		};

		window.addEventListener('pointermove', handleMove);
		return () => window.removeEventListener('pointermove', handleMove);
	}, []);

	const objectMeta = roomObjects.find((item) => item.id === hoveredKey);

	return (
		<AnimatePresence>
			{objectMeta && !panelOpen && !introVisible ? (
				<motion.div
					className="pointer-events-none fixed z-20 max-w-[16rem] rounded-2xl border border-white/10 bg-[rgba(6,10,16,0.88)] px-4 py-3 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)] backdrop-blur-xl"
					style={{ left: position.x, top: position.y }}
					initial={{ opacity: 0, y: 8, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 8, scale: 0.96 }}
					transition={{ duration: 0.16 }}
				>
					<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">{objectMeta.title}</p>
					<p className="mt-2 text-sm font-medium text-white">{objectMeta.shortLabel}</p>
					<p className="mt-1 text-xs leading-5 text-slate-300">{objectMeta.hint}</p>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
