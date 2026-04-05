'use client';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function StickyNotes() {
	const noteMatRef = useHoverGlow('skills');

	return (
		<InteractiveObject panelKey="skills" position={[-0.92, 0.81, 0.22]} rotation={[0, -0.2, -0.08]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.3, 0.06, 0.3]} />
				<meshStandardMaterial ref={noteMatRef} color="#f2d564" roughness={0.95} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh castShadow position={[0.18, 0.02, -0.02]} rotation={[0, 0.18, 0.05]}>
				<boxGeometry args={[0.28, 0.04, 0.28]} />
				<meshStandardMaterial color="#f0a68f" roughness={0.96} />
			</mesh>
			<mesh castShadow position={[0.1, 0.045, 0.14]} rotation={[0, -0.28, -0.02]}>
				<boxGeometry args={[0.26, 0.035, 0.26]} />
				<meshStandardMaterial color="#91e5c3" roughness={0.96} />
			</mesh>
		</InteractiveObject>
	);
}
