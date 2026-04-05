'use client';

import { useEffect, type ReactNode } from 'react';
import * as THREE from 'three';

import { useObjectPick } from '@/hooks/useObjectPick';
import type { PanelKey } from '@/types';

type InteractiveObjectProps = {
	panelKey: Exclude<PanelKey, null | 'awards' | 'experience'>;
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];
	children: ReactNode;
};

export function InteractiveObject({
	panelKey,
	position,
	rotation = [0, 0, 0],
	scale = 1,
	children,
}: InteractiveObjectProps) {
	const { meshRef } = useObjectPick(panelKey);

	useEffect(() => {
		const root = meshRef.current;
		if (!root) {
			return;
		}

		root.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				child.userData.interactive = true;
				child.userData.panelKey = panelKey;
			}
		});

		return () => {
			root.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					child.userData.interactive = false;
					child.userData.panelKey = null;
				}
			});
		};
	}, [meshRef, panelKey]);

	return (
		<group ref={meshRef} position={position} rotation={rotation} scale={scale}>
			{children}
		</group>
	);
}
