'use client';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function DiplomaFrame() {
	const frameMatRef = useHoverGlow('education');

	return (
		<InteractiveObject panelKey="education" position={[-1.55, 1.65, -2.94]} rotation={[0, 0.28, 0]} scale={1.12}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.8, 0.56, 0.05]} />
				<meshStandardMaterial ref={frameMatRef} color="#5b351a" roughness={0.82} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0, 0, 0.028]}>
				<planeGeometry args={[0.62, 0.38]} />
				<meshStandardMaterial color="#e7dcc0" roughness={0.96} />
			</mesh>
			<mesh position={[0, -0.18, 0.03]}>
				<planeGeometry args={[0.42, 0.04]} />
				<meshStandardMaterial color="#c9b27c" roughness={0.8} />
			</mesh>
		</InteractiveObject>
	);
}
