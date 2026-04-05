'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Lighting() {
	const lampRef = useRef<THREE.PointLight>(null);
	const rimRef = useRef<THREE.DirectionalLight>(null);
	const cityRef = useRef<THREE.SpotLight>(null);

	useFrame(({ clock }) => {
		if (!lampRef.current) {
			return;
		}

		const t = clock.elapsedTime;
		if (t < 2) {
			lampRef.current.intensity = 3.95 + Math.sin(t * 40) * (2 - t) * 0.15;
		} else {
			lampRef.current.intensity = 3.95;
		}

		if (rimRef.current) {
			rimRef.current.intensity = 0.72 + Math.sin(t * 0.55) * 0.05;
		}

		if (cityRef.current) {
			cityRef.current.intensity = 1.1 + Math.sin(t * 0.4) * 0.04;
		}
	});

	return (
		<>
			<pointLight
				ref={lampRef}
				position={[0.85, 1.95, -0.25]}
				color="#fff0d8"
				intensity={3.95}
				distance={6.5}
				decay={2}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-bias={-0.001}
			/>
			<ambientLight color="#0f1b2c" intensity={0.34} />
			<directionalLight
				ref={rimRef}
				position={[-3.5, 4.8, 1.6]}
				color="#8eb7ff"
				intensity={0.72}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-bias={-0.0005}
			/>
			<spotLight
				ref={cityRef}
				position={[-2.8, 3.8, -5.1]}
				angle={0.52}
				penumbra={0.8}
				intensity={1.1}
				color="#6fa2ff"
			/>
			<pointLight position={[0.1, 0.4, 2.3]} color="#090d14" intensity={0.22} />
		</>
	);
}
