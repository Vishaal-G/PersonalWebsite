'use client';

import { useHoverGlow } from '@/hooks/useHoverGlow';
import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';

export function Laptop() {
	const bodyMatRef = useHoverGlow('projects');

	return (
		<InteractiveObject panelKey="projects" position={[0, 0.84, 0.02]} rotation={[0, -0.12, 0]}>
			<mesh castShadow receiveShadow position={[0, 0, 0.04]}>
				<boxGeometry args={[0.92, 0.03, 0.64]} />
				<meshStandardMaterial ref={bodyMatRef} color="#767c87" metalness={0.75} roughness={0.28} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0.3, -0.17]} rotation={[-1.08, 0, 0]}>
				<boxGeometry args={[0.86, 0.03, 0.54]} />
				<meshStandardMaterial color="#6d7380" metalness={0.78} roughness={0.3} />
			</mesh>
			<mesh position={[0, 0.31, -0.165]} rotation={[-1.08, 0, 0]}>
				<planeGeometry args={[0.76, 0.44]} />
				<meshStandardMaterial color="#12253a" emissive="#3ca4ff" emissiveIntensity={0.55} />
			</mesh>
			<mesh position={[0, 0.018, 0.03]}>
				<planeGeometry args={[0.55, 0.3]} />
				<meshStandardMaterial color="#202836" roughness={0.95} />
			</mesh>
			<mesh position={[0, 0.017, 0.23]}>
				<boxGeometry args={[0.18, 0.002, 0.08]} />
				<meshStandardMaterial color="#9ba3af" metalness={0.3} roughness={0.5} />
			</mesh>
		</InteractiveObject>
	);
}
