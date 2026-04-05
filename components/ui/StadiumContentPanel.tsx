'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

import { getPanelMeta } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';
import { HeroPanel } from '@/components/ui/stadium-panels/HeroPanel';
import { ProjectsPanel } from '@/components/ui/stadium-panels/ProjectsPanel';
import { SkillsPanel } from '@/components/ui/stadium-panels/SkillsPanel';
import { AboutPanel } from '@/components/ui/stadium-panels/AboutPanel';
import { ExperiencePanel } from '@/components/ui/stadium-panels/ExperiencePanel';
import { EducationPanel } from '@/components/ui/stadium-panels/EducationPanel';
import { ContactPanel } from '@/components/ui/stadium-panels/ContactPanel';
import type { PanelKey } from '@/types';

const PANEL_LOOKUP = {
	hero: HeroPanel,
	projects: ProjectsPanel,
	skills: SkillsPanel,
	about: AboutPanel,
	experience: ExperiencePanel,
	education: EducationPanel,
	contact: ContactPanel,
} as const;

const JOURNEY: Exclude<PanelKey, null>[] = ['hero', 'about', 'skills', 'projects', 'education', 'experience', 'contact'];

function getNextPanel(panel: PanelKey) {
	if (!panel) return null;
	const index = JOURNEY.indexOf(panel);
	return index >= 0 && index < JOURNEY.length - 1 ? JOURNEY[index + 1] : null;
}

export function StadiumContentPanel() {
	const { activePanel, panelOpen, setActivePanel, setPanelOpen, setAutoRotating } = useStore();
	const [contentReady, setContentReady] = useState(false);

	const close = useCallback(() => {
		setPanelOpen(false);
		setAutoRotating(true);
	}, [setAutoRotating, setPanelOpen]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && activePanel) close();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [activePanel, close]);

	const meta = activePanel ? getPanelMeta(activePanel) : null;
	const ActiveComponent = activePanel && activePanel in PANEL_LOOKUP ? PANEL_LOOKUP[activePanel as keyof typeof PANEL_LOOKUP] : null;
	const nextPanel = useMemo(() => getNextPanel(activePanel), [activePanel]);
	const nextMeta = nextPanel ? getPanelMeta(nextPanel) : null;

	useEffect(() => {
		if (!panelOpen || !activePanel) {
			setContentReady(false);
			return;
		}
		setContentReady(false);
		const timer = window.setTimeout(() => setContentReady(true), 520);
		return () => window.clearTimeout(timer);
	}, [activePanel, panelOpen]);

	if (!activePanel || !ActiveComponent) return null;

	return (
		<AnimatePresence>
			{panelOpen && contentReady ? (
				<motion.div
					className="fixed inset-0 z-40 bg-[linear-gradient(180deg,rgba(7,24,12,0.66),rgba(7,24,12,0.78))] backdrop-blur-md"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="flex h-full flex-col">
						<div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5 text-white md:px-10">
							<div className="max-w-3xl">
								<p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d9efdb]">Base Path Story</p>
								<h2 className="mt-3 text-4xl font-bold tracking-[-0.04em]">{meta?.label ?? activePanel}</h2>
								<p className="mt-3 text-sm leading-6 text-white/82 md:text-base">{meta?.subtitle ?? 'Portfolio content from the selected zone.'}</p>
							</div>
							<div className="flex items-center gap-3">
								{nextMeta ? (
									<button
										onClick={() => nextPanel && setActivePanel(nextPanel)}
										className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/18"
									>
										Next: {nextMeta.label}
										<ArrowRight className="h-4 w-4" />
									</button>
								) : null}
								<button onClick={close} className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 text-white transition hover:bg-white/18" aria-label="Close panel">
									<X className="h-5 w-5" />
								</button>
							</div>
						</div>

						<div className="panel-scroll flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6">
							<div className="mx-auto min-h-full max-w-6xl rounded-[2rem] border border-[#d6e9d6] bg-[#f6fbf4] p-4 shadow-[0_32px_100px_-44px_rgba(0,0,0,0.45)] md:p-7">
								<ActiveComponent />
							</div>
						</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
