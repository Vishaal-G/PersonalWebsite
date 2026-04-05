'use client';

import { create } from 'zustand';

import type { PortfolioObjectId } from '@/lib/immersive-room';
import type { PanelKey } from '@/types';

type StoreState = {
	panelOpen: boolean;
	hoveredKey: string | null;
	autoRotating: boolean;
	isAutoRotating: boolean;
	introVisible: boolean;
	hintVisible: boolean;
	hasEntered: boolean;
	locked: boolean;
	overlayVisible: boolean;
	hoveredObject: PortfolioObjectId | null;
	activePanel: PanelKey;
	visitedObjects: PortfolioObjectId[];
	setPanelOpen: (value: boolean) => void;
	setHoveredKey: (value: string | null) => void;
	setAutoRotating: (value: boolean) => void;
	setIntroVisible: (value: boolean) => void;
	setHintVisible: (value: boolean) => void;
	setHasEntered: (value: boolean) => void;
	setLocked: (value: boolean) => void;
	setOverlayVisible: (value: boolean) => void;
	setHoveredObject: (value: PortfolioObjectId | null) => void;
	setActivePanel: (value: PanelKey) => void;
	markVisited: (value: PortfolioObjectId) => void;
};

export const useStore = create<StoreState>((set) => ({
	panelOpen: false,
	hoveredKey: null,
	autoRotating: false,
	isAutoRotating: false,
	introVisible: true,
	hintVisible: true,
	hasEntered: false,
	locked: false,
	overlayVisible: false,
	hoveredObject: null,
	activePanel: null,
	visitedObjects: [],
	setPanelOpen: (value) => set({ panelOpen: value, overlayVisible: value }),
	setHoveredKey: (value) => set({ hoveredKey: value, hoveredObject: value as PortfolioObjectId | null }),
	setAutoRotating: (value) => set({ isAutoRotating: value, autoRotating: value }),
	setIntroVisible: (value) => set({ introVisible: value, hasEntered: !value }),
	setHintVisible: (value) => set({ hintVisible: value }),
	setHasEntered: (value) => set({ hasEntered: value }),
	setLocked: (value) => set({ locked: value }),
	setOverlayVisible: (value) => set({ overlayVisible: value }),
	setHoveredObject: (value) => set({ hoveredObject: value, hoveredKey: value }),
	setActivePanel: (value) => set({ activePanel: value }),
	markVisited: (value) =>
		set((state) => ({
			visitedObjects: state.visitedObjects.includes(value)
				? state.visitedObjects
				: [...state.visitedObjects, value],
		})),
}));
