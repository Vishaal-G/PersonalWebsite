'use client';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function Trophy() {
	const trophyMatRef = useHoverGlow('achievements');

	return (
		<InteractiveObject panelKey="achievements" position={[1.55, 1.33, -2.52]} rotation={[0, -0.26, 0]}>
			<mesh castShadow receiveShadow position={[0, -0.18, 0]}>
				<cylinderGeometry args={[0.18, 0.22, 0.1, 24]} />
				<meshStandardMaterial color="#3a2618" roughness={0.82} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, -0.02, 0]}>
				<cylinderGeometry args={[0.06, 0.09, 0.22, 24]} />
				<meshStandardMaterial color="#bf8f2e" metalness={0.72} roughness={0.32} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0.18, 0]}>
				<cylinderGeometry args={[0.2, 0.14, 0.22, 32]} />
				<meshStandardMaterial ref={trophyMatRef} color="#d9ab43" metalness={0.75} roughness={0.3} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh castShadow position={[0.2, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
				<torusGeometry args={[0.08, 0.015, 16, 32, Math.PI]} />
				<meshStandardMaterial color="#d9ab43" metalness={0.75} roughness={0.32} />
			</mesh>
			<mesh castShadow position={[-0.2, 0.22, 0]} rotation={[0, Math.PI, Math.PI / 2]}>
				<torusGeometry args={[0.08, 0.015, 16, 32, Math.PI]} />
				<meshStandardMaterial color="#d9ab43" metalness={0.75} roughness={0.32} />
			</mesh>
		</InteractiveObject>
	);
}
