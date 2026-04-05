'use client';

import { Text } from '@react-three/drei';
import { useMemo } from 'react';

import { makeGoldTexture } from '@/lib/textures';

export function Nameplate() {
	const goldTexture = useMemo(() => makeGoldTexture(), []);

	return (
		<group position={[0, 0.84, 0.62]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.88, 0.09, 0.14]} />
				<meshStandardMaterial map={goldTexture} color="#c89d2f" metalness={0.85} roughness={0.28} />
			</mesh>
			<mesh position={[0, 0.055, -0.045]} castShadow receiveShadow rotation={[-0.22, 0, 0]}>
				<boxGeometry args={[0.88, 0.08, 0.08]} />
				<meshStandardMaterial map={goldTexture} color="#af7f14" metalness={0.8} roughness={0.3} />
			</mesh>
			<Text
				position={[0, 0.018, 0.073]}
				fontSize={0.065}
				maxWidth={0.78}
				color="#2f1d05"
				anchorX="center"
				anchorY="middle"
				rotation={[-0.02, 0, 0]}
			>
				VISHAAL GOPALAN
			</Text>
		</group>
	);
}
