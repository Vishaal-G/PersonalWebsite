'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AboutPanel } from '@/components/ui/panels/AboutPanel';
import { AchievementsPanel } from '@/components/ui/panels/AchievementsPanel';
import { BlogPanel } from '@/components/ui/panels/BlogPanel';
import { ContactPanel } from '@/components/ui/panels/ContactPanel';
import { EducationPanel } from '@/components/ui/panels/EducationPanel';
import { HobbiesPanel } from '@/components/ui/panels/HobbiesPanel';
import { ProjectsPanel } from '@/components/ui/panels/ProjectsPanel';
import { ResumePanel } from '@/components/ui/panels/ResumePanel';
import { SkillsPanel } from '@/components/ui/panels/SkillsPanel';
import { roomObjects } from '@/lib/immersive-room';
import { useStore } from '@/store/useStore';

const panelLookup = {
	hero: AboutPanel,
	projects: ProjectsPanel,
	resume: ResumePanel,
	skills: SkillsPanel,
	about: AboutPanel,
	hobbies: HobbiesPanel,
	education: EducationPanel,
	contact: ContactPanel,
	blog: BlogPanel,
	achievements: AchievementsPanel,
	awards: AchievementsPanel,
	experience: ResumePanel,
};

export function ContentPanel() {
	const { activePanel, panelOpen, setActivePanel, setPanelOpen, setAutoRotating } = useStore();

	const closePanel = useCallback(() => {
		setPanelOpen(false);
		setAutoRotating(true);
		window.dispatchEvent(new Event('panel-close'));
		setTimeout(() => setActivePanel(null), 360);
	}, [setActivePanel, setAutoRotating, setPanelOpen]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && activePanel) {
				closePanel();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [activePanel, closePanel]);

	const meta = roomObjects.find((object) => object.id === activePanel);
	const ActiveComponent = activePanel ? panelLookup[activePanel] : null;

	return (
		<AnimatePresence>
			{activePanel && ActiveComponent ? (
				<>
					<motion.div
						className="fixed inset-0 z-20 bg-black/35 backdrop-blur-[2px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: panelOpen ? 1 : 0 }}
						exit={{ opacity: 0 }}
						onClick={closePanel}
					/>
					<motion.aside
						className="panel-scroll fixed right-4 top-4 z-30 flex h-[calc(100vh-2rem)] w-[min(32rem,calc(100vw-2rem))] flex-col overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,18,0.92),rgba(10,18,30,0.96))] p-4 shadow-[0_40px_120px_-45px_rgba(0,0,0,0.98)] backdrop-blur-2xl"
						initial={{ x: 420, opacity: 0 }}
						animate={{ x: panelOpen ? 0 : 420, opacity: panelOpen ? 1 : 0 }}
						exit={{ x: 420, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 210, damping: 26 }}
					>
						<div className="mb-4 flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
							<div>
								<p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">Desk Object</p>
								<h2 className="mt-2 text-2xl font-semibold text-white">{meta?.shortLabel ?? activePanel}</h2>
								<p className="mt-2 text-sm leading-6 text-slate-300">
									{meta?.hint ?? 'Selected portfolio content.'}
								</p>
							</div>
							<Button size="icon" variant="ghost" onClick={closePanel} aria-label="Close panel">
								<X className="h-5 w-5" />
							</Button>
						</div>
						<ActiveComponent />
						<div className="mt-4 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-xs text-slate-400">
							Press <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-slate-300">ESC</kbd> to return
						</div>
					</motion.aside>
				</>
			) : null}
		</AnimatePresence>
	);
}
