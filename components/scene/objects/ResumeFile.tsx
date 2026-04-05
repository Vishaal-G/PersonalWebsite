'use client';

import { ActionObject } from '@/components/scene/objects/ActionObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function ResumeFile() {
	const matRef = useHoverGlow('resume-file');

	return (
		<ActionObject hoverKey="resume-file" position={[-0.52, 0.81, 0.42]} rotation={[0, 0.22, 0.06]} downloadPath="/Vishaal_Gopalan_Resume.pdf">
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.34, 0.04, 0.48]} />
				<meshStandardMaterial ref={matRef} color="#e7eaef" roughness={0.84} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0.06, 0.022, 0.08]}>
				<planeGeometry args={[0.18, 0.03]} />
				<meshBasicMaterial color="#2563eb" />
			</mesh>
		</ActionObject>
	);
}
