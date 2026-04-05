'use client';

export function Keyboard() {
	return (
		<group position={[0, 0.815, 0.35]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.82, 0.035, 0.28]} />
				<meshStandardMaterial color="#1e2531" roughness={0.75} metalness={0.2} />
			</mesh>
		</group>
	);
}
