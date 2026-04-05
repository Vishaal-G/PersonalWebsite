'use client';

export function Monitor() {
	return (
		<group position={[0, 1.08, -0.58]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[1.05, 0.62, 0.06]} />
				<meshStandardMaterial color="#2d3340" roughness={0.58} metalness={0.4} />
			</mesh>
			<mesh position={[0, 0, 0.035]}>
				<planeGeometry args={[0.92, 0.5]} />
				<meshStandardMaterial color="#060d17" emissive="#0a1f39" emissiveIntensity={0.12} />
			</mesh>
			<mesh position={[0, -0.42, -0.02]} castShadow receiveShadow>
				<boxGeometry args={[0.08, 0.4, 0.08]} />
				<meshStandardMaterial color="#7b8592" roughness={0.42} metalness={0.72} />
			</mesh>
			<mesh position={[0, -0.63, 0.02]} castShadow receiveShadow>
				<boxGeometry args={[0.42, 0.04, 0.26]} />
				<meshStandardMaterial color="#59616d" roughness={0.48} metalness={0.66} />
			</mesh>
		</group>
	);
}
