'use client';

import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useStore } from '@/store/useStore';

export function CameraRig() {
	const ref = useRef<OrbitControlsImpl>(null);
	const { autoRotating, setAutoRotating, panelOpen } = useStore();

	useEffect(() => {
		let idleTimer: ReturnType<typeof setTimeout> | null = null;

		const resetIdle = () => {
			setAutoRotating(false);
			if (idleTimer) {
				clearTimeout(idleTimer);
			}
			idleTimer = setTimeout(() => {
				if (!useStore.getState().panelOpen) {
					setAutoRotating(true);
				}
			}, 5000);
		};

		window.addEventListener('pointerdown', resetIdle);
		window.addEventListener('wheel', resetIdle, { passive: true });
		window.addEventListener('touchstart', resetIdle, { passive: true });

		return () => {
			window.removeEventListener('pointerdown', resetIdle);
			window.removeEventListener('wheel', resetIdle);
			window.removeEventListener('touchstart', resetIdle);
			if (idleTimer) {
				clearTimeout(idleTimer);
			}
		};
	}, [setAutoRotating]);

	return (
		<OrbitControls
			ref={ref}
			makeDefault
			minPolarAngle={Math.PI / 5.2}
			maxPolarAngle={Math.PI / 2.06}
			minAzimuthAngle={-Math.PI / 2.2}
			maxAzimuthAngle={Math.PI / 2.2}
			minDistance={2.7}
			maxDistance={8.5}
			enableDamping
			dampingFactor={0.06}
			rotateSpeed={0.56}
			zoomSpeed={0.75}
			target={[0, 1.02, -0.05]}
			autoRotate={autoRotating && !panelOpen}
			autoRotateSpeed={0.34}
			onStart={() => setAutoRotating(false)}
			enabled={!panelOpen}
		/>
	);
}
