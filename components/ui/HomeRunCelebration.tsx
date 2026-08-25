'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { stadiumPanels } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

const CONFETTI_COLORS = ['#f1c14b', '#7dbef3', '#ed9aa2', '#8fd19e', '#ece28a'];

function useConfettiPieces(count: number) {
	return useRef(
		Array.from({ length: count }, (_, index) => ({
			id: index,
			left: Math.random() * 100,
			delay: Math.random() * 0.4,
			duration: 1.6 + Math.random() * 1.2,
			color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
			rotate: Math.random() * 360,
		}))
	).current;
}

export function HomeRunCelebration() {
	const visitedPanels = useStore((state) => state.visitedPanels);
	const firedRef = useRef(false);
	const [showing, setShowing] = useState(false);
	const pieces = useConfettiPieces(28);

	useEffect(() => {
		if (firedRef.current || visitedPanels.length < stadiumPanels.length) return;
		firedRef.current = true;
		setShowing(true);
		toast("You've rounded every base — thanks for stopping by!");
		const timer = window.setTimeout(() => setShowing(false), 2600);
		return () => window.clearTimeout(timer);
	}, [visitedPanels.length]);

	if (!showing) return null;

	return (
		<div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
			{pieces.map((piece) => (
				<span
					key={piece.id}
					className="absolute top-[-10%] block h-2.5 w-2.5 rounded-sm"
					style={{
						left: `${piece.left}%`,
						backgroundColor: piece.color,
						animation: `home-run-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
						transform: `rotate(${piece.rotate}deg)`,
					}}
				/>
			))}
			<style jsx>{`
				@keyframes home-run-fall {
					to {
						transform: translateY(120vh) rotate(360deg);
						opacity: 0.15;
					}
				}
			`}</style>
		</div>
	);
}
