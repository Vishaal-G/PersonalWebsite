'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { useStore } from '@/store/useStore';

export function useHoverGlow(panelKey: string) {
	const matRef = useRef<THREE.MeshStandardMaterial>(null);
	const hovered = useStore((state) => state.hoveredKey === panelKey);

	useFrame(() => {
		if (!matRef.current) {
			return;
		}

		const target = hovered ? 0.15 : 0;
		matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, target, 0.12);
	});

	return matRef;
}
