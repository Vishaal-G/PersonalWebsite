'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;

export function DustParticles() {
	const pointsRef = useRef<THREE.Points>(null);

	const { positions, velocities, phases } = useMemo(() => {
		const positionsArray = new Float32Array(PARTICLE_COUNT * 3);
		const velocitiesArray = new Float32Array(PARTICLE_COUNT * 3);
		const phaseArray = new Float32Array(PARTICLE_COUNT);

		for (let i = 0; i < PARTICLE_COUNT; i += 1) {
			positionsArray[i * 3] = 0.85 + (Math.random() - 0.5) * 1.4;
			positionsArray[i * 3 + 1] = 1.0 + Math.random() * 1.2;
			positionsArray[i * 3 + 2] = -0.3 + (Math.random() - 0.5) * 1.2;
			velocitiesArray[i * 3] = (Math.random() - 0.5) * 0.0003;
			velocitiesArray[i * 3 + 1] = (Math.random() - 0.5) * 0.0002;
			velocitiesArray[i * 3 + 2] = (Math.random() - 0.5) * 0.0003;
			phaseArray[i] = Math.random() * Math.PI * 2;
		}

		return { positions: positionsArray, velocities: velocitiesArray, phases: phaseArray };
	}, []);

	const geometry = useMemo(() => {
		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		return geo;
	}, [positions]);

	useFrame(({ clock }) => {
		if (!pointsRef.current) {
			return;
		}

		const t = clock.elapsedTime;
		const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
		for (let i = 0; i < PARTICLE_COUNT; i += 1) {
			pos[i * 3] += velocities[i * 3] + Math.sin(t * 0.3 + phases[i]) * 0.00015;
			pos[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.2 + phases[i]) * 0.0001;
			pos[i * 3 + 2] += velocities[i * 3 + 2];

			if (pos[i * 3 + 1] > 2.2) pos[i * 3 + 1] = 0.9;
			if (pos[i * 3 + 1] < 0.8) pos[i * 3 + 1] = 2.1;
			if (Math.abs(pos[i * 3] - 0.85) > 1.0) velocities[i * 3] *= -1;
			if (Math.abs(pos[i * 3 + 2] + 0.3) > 0.8) velocities[i * 3 + 2] *= -1;
		}

		pointsRef.current.geometry.attributes.position.needsUpdate = true;
	});

	return (
		<points ref={pointsRef} geometry={geometry}>
			<pointsMaterial
				size={0.008}
				color="#ffe8a0"
				transparent
				opacity={0.55}
				sizeAttenuation
				depthWrite={false}
			/>
		</points>
	);
}
