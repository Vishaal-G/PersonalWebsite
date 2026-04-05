'use client';

export function PenCup() {
	return (
		<group position={[-1.06, 0.86, -0.32]}>
			<mesh castShadow receiveShadow>
				<cylinderGeometry args={[0.11, 0.13, 0.18, 24]} />
				<meshStandardMaterial color="#1a212a" roughness={0.65} metalness={0.35} />
			</mesh>
			{[
				[-0.03, 0.16, 0.02, '#f4b15f'],
				[0.02, 0.2, -0.01, '#7ddab6'],
				[0.05, 0.18, 0.03, '#7ab5ff'],
			].map(([x, y, z, color], index) => (
				<mesh key={index} position={[Number(x), Number(y), Number(z)]} castShadow rotation={[0.08, 0, Number(x) * 2]}>
					<cylinderGeometry args={[0.012, 0.012, 0.28, 12]} />
					<meshStandardMaterial color={String(color)} roughness={0.45} />
				</mesh>
			))}
		</group>
	);
}
