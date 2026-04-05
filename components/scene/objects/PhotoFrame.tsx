'use client';

import { useTexture } from '@react-three/drei';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function PhotoFrame() {
	const photoTexture = useTexture('/images/about.jpg');
	const frameMatRef = useHoverGlow('about');

	return (
		<InteractiveObject panelKey="about" position={[-0.12, 0.84, -0.26]} rotation={[-0.2, 0, 0]}>
			<mesh castShadow receiveShadow position={[0, 0.24, 0]}>
				<boxGeometry args={[0.45, 0.55, 0.05]} />
				<meshStandardMaterial ref={frameMatRef} color="#4f3320" roughness={0.8} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0, 0.24, 0.028]}>
				<planeGeometry args={[0.32, 0.42]} />
				<meshStandardMaterial map={photoTexture} roughness={0.9} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0.05, -0.08]} rotation={[0.8, 0, 0]}>
				<boxGeometry args={[0.12, 0.34, 0.03]} />
				<meshStandardMaterial color="#3a2616" roughness={0.75} />
			</mesh>
		</InteractiveObject>
	);
}
