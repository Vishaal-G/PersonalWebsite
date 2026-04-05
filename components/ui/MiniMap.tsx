'use client';

import { roomObjects } from '@/lib/immersive-room';
import { useStore } from '@/store/useStore';

export function MiniMap() {
	const { hasEntered, visitedObjects, overlayVisible } = useStore();

	if (!hasEntered || overlayVisible) {
		return null;
	}

	return (
		<div className="pointer-events-none absolute bottom-6 right-6 z-20 h-36 w-36 rounded-full border border-white/10 bg-black/35 backdrop-blur-xl">
			<div className="absolute inset-[14%] rounded-full border border-white/10" />
			<div className="absolute left-1/2 top-[14%] h-[72%] w-px -translate-x-1/2 bg-white/8" />
			<div className="absolute top-1/2 left-[14%] h-px w-[72%] -translate-y-1/2 bg-white/8" />
			{roomObjects.map((object) => {
				const seen = visitedObjects.includes(object.id);
				return (
					<span
						key={object.id}
						className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
							seen
								? 'border-cyan-300 bg-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.5)]'
								: 'border-white/20 bg-white/8'
						}`}
						style={{
							left: object.mapPosition.left,
							top: object.mapPosition.top,
						}}
					/>
				);
			})}
		</div>
	);
}
