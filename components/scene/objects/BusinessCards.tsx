'use client';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function BusinessCards() {
	const holderMatRef = useHoverGlow('contact');

	return (
		<InteractiveObject panelKey="contact" position={[0.82, 0.81, 0.42]} rotation={[0, -0.28, -0.1]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.42, 0.04, 0.26]} />
				<meshStandardMaterial ref={holderMatRef} color="#f3f5f9" roughness={0.78} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh castShadow position={[0.06, 0.018, -0.02]} rotation={[0, 0.12, 0.08]}>
				<boxGeometry args={[0.42, 0.035, 0.26]} />
				<meshStandardMaterial color="#e2e8f0" roughness={0.8} />
			</mesh>
			<mesh position={[0.03, 0.024, 0.03]}>
				<planeGeometry args={[0.22, 0.03]} />
				<meshStandardMaterial color="#0e7490" />
			</mesh>
		</InteractiveObject>
	);
}
