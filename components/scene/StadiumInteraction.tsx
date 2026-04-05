'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { toast } from 'sonner';

import { useStore } from '@/store/useStore';

export function StadiumInteraction() {
	const { camera, scene, gl } = useThree();
	const raycaster = useRef(new THREE.Raycaster());
	const pointer = useRef(new THREE.Vector2(10, 10));
	const { panelOpen, setActivePanel, setHoveredKey, setPanelOpen, setAutoRotating } = useStore();

	useEffect(() => {
		const handleMove = (event: PointerEvent) => {
			const rect = gl.domElement.getBoundingClientRect();
			pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
		};

		const handleLeave = () => {
			pointer.current.set(10, 10);
			setHoveredKey(null);
			gl.domElement.style.cursor = 'default';
		};

		const handleClick = () => {
			if (panelOpen) return;
			raycaster.current.setFromCamera(pointer.current, camera);
			const hits = raycaster.current.intersectObjects(scene.children, true);
			const hit = hits.find((entry) => entry.object.userData.interactive);
			const data = hit?.object.userData;
			if (!data) return;

			setAutoRotating(false);

			if (data.externalUrl) {
				window.open(data.externalUrl as string, '_blank', 'noopener,noreferrer');
				return;
			}

			if (data.downloadPath) {
				const link = document.createElement('a');
				link.href = data.downloadPath as string;
				link.download = '';
				link.click();
				return;
			}

			if (data.mailto) {
				window.location.href = data.mailto as string;
				return;
			}

			if (data.toastMessage) {
				toast(data.toastMessage as string);
				return;
			}

			if (data.panelKey) {
				setActivePanel(data.panelKey as never);
				window.setTimeout(() => setPanelOpen(true), 420);
			}
		};

		gl.domElement.addEventListener('pointermove', handleMove);
		gl.domElement.addEventListener('pointerleave', handleLeave);
		gl.domElement.addEventListener('click', handleClick);
		return () => {
			gl.domElement.removeEventListener('pointermove', handleMove);
			gl.domElement.removeEventListener('pointerleave', handleLeave);
			gl.domElement.removeEventListener('click', handleClick);
		};
	}, [camera, gl, panelOpen, scene, setActivePanel, setAutoRotating, setHoveredKey, setPanelOpen]);

	useFrame(() => {
		if (panelOpen) {
			setHoveredKey(null);
			gl.domElement.style.cursor = 'default';
			return;
		}
		raycaster.current.setFromCamera(pointer.current, camera);
		const hits = raycaster.current.intersectObjects(scene.children, true);
		const hit = hits.find((entry) => entry.object.userData.interactive);
		const key = (hit?.object.userData.hoverKey as string | null) ?? null;
		setHoveredKey(key);
		gl.domElement.style.cursor = key ? 'pointer' : 'grab';
	});

	return null;
}
