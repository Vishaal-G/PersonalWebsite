'use client';

import { create } from 'zustand';

import type { PanelKey } from '@/types';

type VisitedPanel = Exclude<PanelKey, null>;
type SwingFeedback = 'hit' | 'early' | 'late' | 'no-swing' | null;

type StoreState = {
	panelOpen: boolean;
	hoveredKey: string | null;
	autoRotating: boolean;
	isAutoRotating: boolean;
	activePanel: PanelKey;
	visitedPanels: VisitedPanel[];
	miniGameOpen: boolean;
	swingFeedback: SwingFeedback;
	swingSignal: number;
	pitchStartedAt: number;
	instructionsOpen: boolean;
	setPanelOpen: (value: boolean) => void;
	setHoveredKey: (value: string | null) => void;
	setAutoRotating: (value: boolean) => void;
	setActivePanel: (value: PanelKey) => void;
	markPanelVisited: (value: VisitedPanel) => void;
	setMiniGameOpen: (value: boolean) => void;
	setSwingFeedback: (value: SwingFeedback) => void;
	requestSwing: () => void;
	setPitchStartedAt: (value: number) => void;
	setInstructionsOpen: (value: boolean) => void;
};

export const useStore = create<StoreState>((set) => ({
	panelOpen: false,
	hoveredKey: null,
	autoRotating: false,
	isAutoRotating: false,
	activePanel: null,
	visitedPanels: [],
	miniGameOpen: false,
	swingFeedback: null,
	swingSignal: 0,
	pitchStartedAt: 0,
	instructionsOpen: true,
	setPanelOpen: (value) => set({ panelOpen: value }),
	setHoveredKey: (value) => set({ hoveredKey: value }),
	setAutoRotating: (value) => set({ isAutoRotating: value, autoRotating: value }),
	setActivePanel: (value) => set({ activePanel: value }),
	markPanelVisited: (value) =>
		set((state) => ({
			visitedPanels: state.visitedPanels.includes(value) ? state.visitedPanels : [...state.visitedPanels, value],
		})),
	setMiniGameOpen: (value) => set({ miniGameOpen: value }),
	setSwingFeedback: (value) => set({ swingFeedback: value }),
	requestSwing: () => set((state) => ({ swingSignal: state.swingSignal + 1 })),
	setPitchStartedAt: (value) => set({ pitchStartedAt: value }),
	setInstructionsOpen: (value) => set({ instructionsOpen: value }),
}));
