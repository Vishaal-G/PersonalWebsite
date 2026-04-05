'use client';

import { ActionObject } from '@/components/scene/objects/ActionObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';
import { siteConfig } from '@/lib/constants';

export function GithubPoster() {
	const matRef = useHoverGlow('github');

	return (
		<ActionObject hoverKey="github" position={[4.4, 2.7, -1.25]} rotation={[0, -Math.PI / 2, 0]} externalUrl={siteConfig.links.github}>
			<mesh castShadow receiveShadow>
				<planeGeometry args={[1.2, 1.6]} />
				<meshStandardMaterial ref={matRef} color="#1b1f27" emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[0, 0, 0.02]}>
				<circleGeometry args={[0.34, 32]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
		</ActionObject>
	);
}
