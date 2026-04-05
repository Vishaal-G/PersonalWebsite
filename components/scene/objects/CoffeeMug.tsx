'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function CoffeeMug() {
	const mugMatRef = useHoverGlow('hobbies');
	const steamRef = useRef<THREE.Group>(null);

	useFrame(({ clock }) => {
		if (!steamRef.current) {
			return;
		}

		const t = clock.elapsedTime;
		steamRef.current.children.forEach((child, index) => {
			child.position.y = 0.18 + index * 0.08 + Math.sin(t * 1.1 + index) * 0.02;
			child.position.x = Math.sin(t * 0.7 + index) * 0.015;
		});
	});

	return (
		<InteractiveObject panelKey="hobbies" position={[0.22, 0.85, 0.36]} rotation={[0, 0.35, 0]}>
			<mesh castShadow receiveShadow>
				<cylinderGeometry args={[0.13, 0.11, 0.2, 32, 1, true]} />
				<meshStandardMaterial ref={mugMatRef} color="#2b313e" roughness={0.58} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0, 0.085, 0]} receiveShadow>
				<cylinderGeometry args={[0.13, 0.13, 0.03, 32]} />
				<meshStandardMaterial color="#3b4250" roughness={0.48} />
			</mesh>
			<mesh position={[0, 0.04, 0]}>
				<cylinderGeometry args={[0.105, 0.105, 0.08, 32]} />
				<meshStandardMaterial color="#422818" roughness={0.88} />
			</mesh>
			<mesh castShadow position={[0.14, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
				<torusGeometry args={[0.07, 0.015, 16, 32, Math.PI]} />
				<meshStandardMaterial color="#2b313e" roughness={0.55} />
			</mesh>
			<group ref={steamRef}>
				{[-0.03, 0, 0.03].map((x, index) => (
					<mesh key={x} position={[x, 0.18 + index * 0.08, 0]}>
						<sphereGeometry args={[0.03, 18, 18]} />
						<meshStandardMaterial color="#d8e0f0" transparent opacity={0.16} emissive="#ffffff" emissiveIntensity={0.05} />
					</mesh>
				))}
			</group>
		</InteractiveObject>
	);
}
