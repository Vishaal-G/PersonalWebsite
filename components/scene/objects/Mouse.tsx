'use client';

export function Mouse() {
	return (
		<group position={[0.7, 0.82, 0.28]} rotation={[0, -0.24, 0]}>
			<mesh castShadow receiveShadow>
				<capsuleGeometry args={[0.05, 0.12, 8, 16]} />
				<meshStandardMaterial color="#1e2531" roughness={0.7} metalness={0.18} />
			</mesh>
		</group>
	);
}
