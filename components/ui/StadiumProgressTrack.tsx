'use client';

import { toast } from 'sonner';

import { JOURNEY, getPanelMeta } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

export function StadiumProgressTrack() {
	const activePanel = useStore((state) => state.activePanel);
	const visitedPanels = useStore((state) => state.visitedPanels);
	const setActivePanel = useStore((state) => state.setActivePanel);
	const setPanelOpen = useStore((state) => state.setPanelOpen);
	const markPanelVisited = useStore((state) => state.markPanelVisited);

	const goTo = (key: (typeof JOURNEY)[number], visited: boolean) => {
		if (!visited) {
			toast(`Hit the ball to make your way to ${getPanelMeta(key)?.label ?? 'this base'} — swing at it with Play Ball!`);
			return;
		}
		setActivePanel(key);
		markPanelVisited(key);
		window.setTimeout(() => setPanelOpen(true), 420);
	};

	return (
		<div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center">
			<div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#d8e4d6] bg-[rgba(249,251,245,0.92)] px-4 py-2.5 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.4)] backdrop-blur-sm">
				{JOURNEY.map((key) => {
					const meta = getPanelMeta(key);
					if (!meta) return null;
					const Icon = meta.icon;
					const visited = visitedPanels.includes(key);
					const current = activePanel === key;

					return (
						<button
							key={key}
							onClick={() => goTo(key, visited)}
							title={visited ? meta.label : `${meta.label} — hit the ball to unlock`}
							aria-label={visited ? `Jump to ${meta.label}` : `${meta.label} locked — swing to unlock`}
							className={[
								'grid h-9 w-9 place-items-center rounded-full border transition',
								current
									? 'border-[#f1c14b] bg-[#fff4d6] text-[#8a6410] shadow-[0_0_0_3px_rgba(241,193,75,0.35)]'
									: visited
									? 'border-[#2d5d39] bg-[#2d5d39] text-white'
									: 'border-[#c8d6c8] bg-white text-[#9fb0a0] hover:border-[#2d5d39] hover:text-[#2d5d39]',
							].join(' ')}
						>
							<Icon className="h-4 w-4" />
						</button>
					);
				})}
			</div>
		</div>
	);
}
