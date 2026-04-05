'use client';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';

export function Bookshelf() {
	const shelfMatRef = useHoverGlow('blog');

	return (
		<InteractiveObject panelKey="blog" position={[1.55, 1.5, -2.95]} rotation={[0, -0.22, 0]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[1.1, 0.72, 0.22]} />
				<meshStandardMaterial ref={shelfMatRef} color="#394151" roughness={0.75} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0, 0.16, 0.12]} receiveShadow>
				<boxGeometry args={[0.92, 0.02, 0.08]} />
				<meshStandardMaterial color="#29303b" roughness={0.85} />
			</mesh>
			<mesh position={[0, -0.08, 0.12]} receiveShadow>
				<boxGeometry args={[0.92, 0.02, 0.08]} />
				<meshStandardMaterial color="#29303b" roughness={0.85} />
			</mesh>
			{[-0.32, -0.18, -0.04, 0.14, 0.3].map((x, index) => (
				<mesh key={x} castShadow position={[x, 0.27, 0.1]}>
					<boxGeometry args={[0.11, 0.24 + index * 0.01, 0.06]} />
					<meshStandardMaterial color={['#f3b55f', '#7ddab6', '#ec8071', '#6db6ff', '#f6de7d'][index]} roughness={0.8} />
				</mesh>
			))}
			{[-0.28, -0.1, 0.08, 0.25].map((x, index) => (
				<mesh key={x} castShadow position={[x, -0.01, 0.1]}>
					<boxGeometry args={[0.11, 0.26 + index * 0.02, 0.06]} />
					<meshStandardMaterial color={['#f9c087', '#95edc5', '#9fd2ff', '#f28b7b'][index]} roughness={0.82} />
				</mesh>
			))}
		</InteractiveObject>
	);
}
