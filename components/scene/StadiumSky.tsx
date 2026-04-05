'use client';

import { Billboard, Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Cloud({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
	const groupRef = useRef<THREE.Group>(null);

	useFrame(({ clock }) => {
		if (!groupRef.current) return;
		groupRef.current.position.x = position[0] + Math.sin(clock.elapsedTime * speed) * 1.8;
	});

	return (
		<Billboard position={position} follow ref={groupRef}>
			<group scale={scale}>
				{[
					[-1, 0, 0],
					[-0.2, 0.15, 0],
					[0.7, 0, 0],
					[1.5, -0.05, 0],
				].map(([x, y, z], index) => (
					<mesh key={index} position={[x, y, z]}>
						<sphereGeometry args={[0.85, 18, 18]} />
						<meshStandardMaterial color="#ffffff" transparent opacity={0.85} roughness={1} />
					</mesh>
				))}
			</group>
		</Billboard>
	);
}

export function StadiumSky() {
	const clouds = useMemo(
		() => [
			{ position: [-12, 17, -28] as [number, number, number], scale: 1.25, speed: 0.08 },
			{ position: [4, 15, -31] as [number, number, number], scale: 1.55, speed: 0.05 },
			{ position: [15, 18, -24] as [number, number, number], scale: 1.05, speed: 0.06 },
		],
		[]
	);

	return (
		<>
			<Sky distance={450000} sunPosition={[-8, 10, -4]} turbidity={3.2} rayleigh={1.15} mieCoefficient={0.0025} mieDirectionalG={0.76} />
			{clouds.map((cloud) => (
				<Cloud key={cloud.position.join('-')} {...cloud} />
			))}
		</>
	);
}
