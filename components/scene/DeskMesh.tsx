'use client';

import { useMemo } from 'react';

import { makeLeatherTexture, makeWalnutTexture } from '@/lib/textures';

export function DeskMesh() {
	const woodTex = useMemo(() => makeWalnutTexture(), []);
	const leatherTex = useMemo(() => makeLeatherTexture(), []);

	return (
		<group position={[0, 0, 0]}>
			<mesh position={[0, 0.78, 0]} receiveShadow castShadow>
				<boxGeometry args={[3.05, 0.09, 1.58]} />
				<meshStandardMaterial map={woodTex} roughness={0.42} metalness={0.02} color="#c27d45" />
			</mesh>

			<mesh position={[0, 0.705, 0]} receiveShadow>
				<boxGeometry args={[2.88, 0.07, 1.38]} />
				<meshStandardMaterial color="#2d1a06" roughness={0.9} metalness={0} />
			</mesh>

			{[
				[-1.37, -0.69],
				[1.37, -0.69],
				[-1.37, 0.69],
				[1.37, 0.69],
			].map(([x, z], index) => (
				<mesh key={index} position={[x, 0.37, z]} castShadow receiveShadow>
					<boxGeometry args={[0.09, 0.74, 0.09]} />
					<meshStandardMaterial color="#171a20" roughness={0.38} metalness={0.82} />
				</mesh>
			))}

			<mesh position={[0, 0.13, 0.73]} receiveShadow>
				<boxGeometry args={[2.72, 0.05, 0.05]} />
				<meshStandardMaterial color="#1a1a1a" roughness={0.38} metalness={0.82} />
			</mesh>

			<mesh position={[0, 0.83, -0.02]} receiveShadow>
				<boxGeometry args={[1.68, 0.012, 0.92]} />
				<meshStandardMaterial map={leatherTex} color="#111721" roughness={0.97} metalness={0} />
			</mesh>

			<mesh position={[-1.08, 0.46, 0.58]} castShadow receiveShadow>
				<boxGeometry args={[0.42, 0.48, 0.5]} />
				<meshStandardMaterial map={woodTex} roughness={0.55} metalness={0.02} color="#b5743e" />
			</mesh>

			<mesh position={[-1.08, 0.56, 0.84]} receiveShadow>
				<boxGeometry args={[0.34, 0.015, 0.02]} />
				<meshStandardMaterial color="#d8b583" roughness={0.72} />
			</mesh>

			<mesh position={[-1.08, 0.43, 0.84]} receiveShadow>
				<boxGeometry args={[0.34, 0.015, 0.02]} />
				<meshStandardMaterial color="#d8b583" roughness={0.72} />
			</mesh>
		</group>
	);
}
