'use client';

export function DeskLamp() {
	return (
		<group position={[1.02, 0.83, -0.18]} rotation={[0, -0.62, 0]}>
			<mesh castShadow receiveShadow position={[0, 0.02, 0]}>
				<cylinderGeometry args={[0.2, 0.24, 0.04, 32]} />
				<meshStandardMaterial color="#1a202b" roughness={0.62} metalness={0.25} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0.28, 0]}>
				<cylinderGeometry args={[0.03, 0.03, 0.52, 20]} />
				<meshStandardMaterial color="#7f8794" roughness={0.4} metalness={0.6} />
			</mesh>
			<mesh castShadow receiveShadow position={[-0.02, 0.56, 0]} rotation={[0, 0, -0.55]}>
				<cylinderGeometry args={[0.025, 0.03, 0.42, 20]} />
				<meshStandardMaterial color="#7f8794" roughness={0.4} metalness={0.6} />
			</mesh>
			<mesh castShadow receiveShadow position={[-0.18, 0.74, 0]} rotation={[0.1, 0, -0.28]}>
				<coneGeometry args={[0.16, 0.34, 24]} />
				<meshStandardMaterial color="#2a3240" roughness={0.58} metalness={0.32} emissive="#ffd37c" emissiveIntensity={0.18} />
			</mesh>
			<mesh position={[-0.2, 0.7, 0]}>
				<sphereGeometry args={[0.08, 24, 24]} />
				<meshStandardMaterial color="#ffd485" emissive="#ffcb6f" emissiveIntensity={1.3} toneMapped={false} />
			</mesh>
		</group>
	);
}
