'use client';

import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { defaultCamera, getPanelMeta, introCamera } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

export function StadiumCameraRig() {
	const controlsRef = useRef<OrbitControlsImpl>(null);
	const isFirstRun = useRef(true);
	const [maxDistance, setMaxDistance] = useState(23);
	const [introActive, setIntroActive] = useState(true);
	const { camera } = useThree();
	const { activePanel, panelOpen, miniGameOpen, setAutoRotating } = useStore();

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const preset = miniGameOpen ? defaultCamera : panelOpen && activePanel ? getPanelMeta(activePanel)?.focus ?? defaultCamera : defaultCamera;
		const introRun = isFirstRun.current;
		isFirstRun.current = false;

		if (introRun) {
			setMaxDistance(60);
			camera.position.set(introCamera.position[0], introCamera.position[1], introCamera.position[2]);
			controls.target.set(introCamera.target[0], introCamera.target[1], introCamera.target[2]);
			controls.update();
		}

		const duration = introRun ? 2.6 : 0.95;
		const ease = introRun ? 'power2.out' : 'power3.inOut';
		const animatedTarget = controls.target.clone();

		gsap.to(camera.position, {
			x: preset.position[0],
			y: preset.position[1],
			z: preset.position[2],
			duration,
			ease,
			onUpdate: () => controls.update(),
			onComplete: () => {
				if (introRun) {
					setMaxDistance(23);
					setIntroActive(false);
				}
			},
		});

		gsap.to(animatedTarget, {
			x: preset.target[0],
			y: preset.target[1],
			z: preset.target[2],
			duration,
			ease,
			onUpdate: () => {
				controls.target.copy(animatedTarget);
				controls.update();
			},
		});
	}, [activePanel, camera, panelOpen, miniGameOpen]);

	return (
		<OrbitControls
			ref={controlsRef}
			makeDefault
			enabled={!panelOpen && !miniGameOpen && !introActive}
			enableDamping
			enablePan={false}
			dampingFactor={0.06}
			minPolarAngle={Math.PI / 5.2}
			maxPolarAngle={Math.PI / 2.55}
			minAzimuthAngle={-Math.PI / 3.8}
			maxAzimuthAngle={Math.PI / 3.8}
			minDistance={14}
			maxDistance={maxDistance}
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
