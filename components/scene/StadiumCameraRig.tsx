'use client';

import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { defaultCamera, getPanelMeta } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

export function StadiumCameraRig() {
	const controlsRef = useRef<OrbitControlsImpl>(null);
	const { camera } = useThree();
	const { activePanel, panelOpen, setAutoRotating } = useStore();

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const preset = panelOpen && activePanel ? getPanelMeta(activePanel)?.focus ?? defaultCamera : defaultCamera;
		const animatedTarget = controls.target.clone();

		gsap.to(camera.position, {
			x: preset.position[0],
			y: preset.position[1],
			z: preset.position[2],
			duration: 0.95,
			ease: 'power3.inOut',
			onUpdate: () => controls.update(),
		});

		gsap.to(animatedTarget, {
			x: preset.target[0],
			y: preset.target[1],
			z: preset.target[2],
			duration: 0.95,
			ease: 'power3.inOut',
			onUpdate: () => {
				controls.target.copy(animatedTarget);
				controls.update();
			},
		});
	}, [activePanel, camera, panelOpen]);

	return (
		<OrbitControls
			ref={controlsRef}
			makeDefault
			enabled={!panelOpen}
			enableDamping
			enablePan={false}
			dampingFactor={0.06}
			minPolarAngle={Math.PI / 5.2}
			maxPolarAngle={Math.PI / 2.55}
			minAzimuthAngle={-Math.PI / 3.8}
			maxAzimuthAngle={Math.PI / 3.8}
			minDistance={14}
			maxDistance={23}
			target={defaultCamera.target}
			autoRotate={false}
			autoRotateSpeed={0.12}
			rotateSpeed={0.42}
			zoomSpeed={0.55}
			panSpeed={0}
			onStart={() => setAutoRotating(false)}
		/>
	);
}
