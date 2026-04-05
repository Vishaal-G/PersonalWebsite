'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import * as THREE from 'three';

type StadiumZoneProps = {
	hoverKey: string;
	panelKey?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];
	externalUrl?: string;
	downloadPath?: string;
	mailto?: string;
	toastMessage?: string;
	children: ReactNode;
};

export function StadiumZone({
	hoverKey,
	panelKey,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	scale = 1,
	externalUrl,
	downloadPath,
	mailto,
	toastMessage,
	children,
}: StadiumZoneProps) {
	const groupRef = useRef<THREE.Group>(null);

	useEffect(() => {
		const group = groupRef.current;
		if (!group) return;
		group.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				child.userData.interactive = true;
				child.userData.hoverKey = hoverKey;
				child.userData.panelKey = panelKey ?? null;
				child.userData.externalUrl = externalUrl ?? null;
				child.userData.downloadPath = downloadPath ?? null;
				child.userData.mailto = mailto ?? null;
				child.userData.toastMessage = toastMessage ?? null;
			}
		});
		return () => {
			group.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					child.userData.interactive = false;
				}
			});
		};
	}, [downloadPath, externalUrl, hoverKey, mailto, panelKey, toastMessage]);

	return (
		<group ref={groupRef} position={position} rotation={rotation} scale={scale}>
			{children}
		</group>
	);
}
