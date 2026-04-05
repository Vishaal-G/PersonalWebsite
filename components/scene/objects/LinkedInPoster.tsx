'use client';

import { ActionObject } from '@/components/scene/objects/ActionObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';
import { siteConfig } from '@/lib/constants';

export function LinkedInPoster() {
	const matRef = useHoverGlow('linkedin');

	return (
		<ActionObject hoverKey="linkedin" position={[-4.4, 2.7, -1.2]} rotation={[0, Math.PI / 2, 0]} externalUrl={siteConfig.links.linkedin}>
			<mesh castShadow receiveShadow>
				<planeGeometry args={[1.2, 1.6]} />
				<meshStandardMaterial ref={matRef} color="#0a66c2" emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0, 0, 0.02]}>
				<planeGeometry args={[0.76, 0.76]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
		</ActionObject>
	);
}
