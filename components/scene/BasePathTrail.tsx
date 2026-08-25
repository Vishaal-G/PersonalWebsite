'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useStore } from '@/store/useStore';
import type { PanelKey } from '@/types';

const STOP_POSITIONS: Record<Exclude<PanelKey, null>, [number, number, number]> = {
	hero: [0, 0.045, 10.15],
	about: [4.7, 0.045, 5.4],
	skills: [0, 0.045, 0.7],
	projects: [-4.7, 0.045, 5.4],
	education: [0, 0.045, 4.05],
	experience: [0, 0.045, -6],
	contact: [6.1, 0.045, 10.6],
	resume: [0, 0.045, 10.15],
	hobbies: [0, 0.045, 10.15],
	blog: [0, 0.045, 10.15],
	achievements: [0, 0.045, 10.15],
	awards: [0, 0.045, 10.15],
};

const DASH_LENGTH = 0.42;
const GAP_LENGTH = 0.28;
const PATH_WIDTH = 0.22;
const PATH_COLOR = '#e8c77a';
const TRANSITION_VISIBLE_MS = 1400;

function DashedSegment({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
	const startVec = new THREE.Vector3(...start);
	const endVec = new THREE.Vector3(...end);
	const total = startVec.distanceTo(endVec);
	const direction = endVec.clone().sub(startVec).normalize();
	const angle = Math.atan2(endVec.z - startVec.z, endVec.x - startVec.x);
	const step = DASH_LENGTH + GAP_LENGTH;
	const count = Math.max(1, Math.floor(total / step));

	return (
		<>
			{Array.from({ length: count }, (_, index) => {
				const dashStart = startVec.clone().addScaledVector(direction, index * step);
				const dashCenter = dashStart.clone().addScaledVector(direction, DASH_LENGTH / 2);
				return (
					<mesh key={index} position={[dashCenter.x, 0.045, dashCenter.z]} rotation={[-Math.PI / 2, 0, angle]} receiveShadow>
						<planeGeometry args={[DASH_LENGTH, PATH_WIDTH]} />
						<meshStandardMaterial color={PATH_COLOR} roughness={0.95} transparent opacity={0.8} />
					</mesh>
				);
			})}
		</>
	);
}

export function BasePathTrail() {
	const activePanel = useStore((state) => state.activePanel);
	const prevPanelRef = useRef<PanelKey>(null);
	const timeoutRef = useRef<number | null>(null);
	const [transition, setTransition] = useState<{ from: [number, number, number]; to: [number, number, number] } | null>(null);

	useEffect(() => {
		const previous = prevPanelRef.current;
		if (previous && activePanel && previous !== activePanel) {
			setTransition({ from: STOP_POSITIONS[previous], to: STOP_POSITIONS[activePanel] });
			if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => setTransition(null), TRANSITION_VISIBLE_MS);
		}
		prevPanelRef.current = activePanel;
	}, [activePanel]);

	useEffect(
		() => () => {
			if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
		},
		[]
	);

	if (!transition) return null;
	return <DashedSegment start={transition.from} end={transition.to} />;
}
