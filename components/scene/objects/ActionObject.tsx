'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import * as THREE from 'three';

type ActionObjectProps = {
	hoverKey: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];
	externalUrl?: string;
	downloadPath?: string;
	mailto?: string;
	toastMessage?: string;
	children: ReactNode;
};

export function ActionObject({
	hoverKey,
	position,
	rotation = [0, 0, 0],
	scale = 1,
	externalUrl,
	downloadPath,
	mailto,
	toastMessage,
	children,
}: ActionObjectProps) {
	const groupRef = useRef<THREE.Group>(null);

	useEffect(() => {
		const root = groupRef.current;
		if (!root) {
			return;
		}

		root.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				child.userData.interactive = true;
				child.userData.hoverKey = hoverKey;
				child.userData.externalUrl = externalUrl;
				child.userData.downloadPath = downloadPath;
				child.userData.mailto = mailto;
				child.userData.toastMessage = toastMessage;
			}
		});

		return () => {
			root.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					child.userData.interactive = false;
				}
			});
		};
	}, [downloadPath, externalUrl, hoverKey, mailto, toastMessage]);

	return (
		<group ref={groupRef} position={position} rotation={rotation} scale={scale}>
			{children}
		</group>
	);
}
