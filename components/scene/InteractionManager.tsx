'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { toast } from 'sonner';

import { useStore } from '@/store/useStore';

export function InteractionManager() {
	const { camera, scene, gl } = useThree();
	const ray = useRef(new THREE.Raycaster());
	const mouse = useRef(new THREE.Vector2(10, 10));
	const { setHoveredKey, setActivePanel, setPanelOpen, panelOpen } = useStore();

	useEffect(() => {
		const handleMove = (event: MouseEvent) => {
			const rect = gl.domElement.getBoundingClientRect();
			mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
		};

		const handleLeave = () => {
			mouse.current.set(10, 10);
			setHoveredKey(null);
			gl.domElement.style.cursor = 'default';
		};

		const handleClick = () => {
			if (panelOpen) {
				return;
			}

			ray.current.setFromCamera(mouse.current, camera);
			const hits = ray.current.intersectObjects(scene.children, true);
			const hit = hits.find((entry) => entry.object.userData.interactive);
			const data = hit?.object.userData;
			if (!data) {
				return;
			}

			if (data.externalUrl) {
				window.open(data.externalUrl as string, '_blank', 'noopener,noreferrer');
				return;
			}

			if (data.downloadPath) {
				const anchor = document.createElement('a');
				anchor.href = data.downloadPath as string;
				anchor.download = '';
				anchor.click();
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

			if (!data.panelKey) {
				return;
			}

			setActivePanel(data.panelKey as never);
			setPanelOpen(true);
			window.dispatchEvent(new CustomEvent('object-picked', { detail: { key: data.panelKey } }));
		};

		gl.domElement.addEventListener('mousemove', handleMove);
		gl.domElement.addEventListener('mouseleave', handleLeave);
		gl.domElement.addEventListener('click', handleClick);

		return () => {
			gl.domElement.removeEventListener('mousemove', handleMove);
			gl.domElement.removeEventListener('mouseleave', handleLeave);
			gl.domElement.removeEventListener('click', handleClick);
		};
	}, [camera, gl, panelOpen, scene, setActivePanel, setHoveredKey, setPanelOpen]);

	useFrame(() => {
		if (panelOpen) {
			setHoveredKey(null);
			gl.domElement.style.cursor = 'default';
			return;
		}

		ray.current.setFromCamera(mouse.current, camera);
		const hits = ray.current.intersectObjects(scene.children, true);
		const hit = hits.find((entry) => entry.object.userData.interactive);
		const key = (hit?.object.userData.hoverKey as string | null) ?? (hit?.object.userData.panelKey as string | null) ?? null;
		setHoveredKey(key);
		gl.domElement.style.cursor = key ? 'pointer' : 'grab';
	});

	return null;
}
