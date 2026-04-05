'use client';

export function Plant() {
	return (
		<group position={[-2.8, 0.45, -1.8]}>
			<mesh castShadow receiveShadow position={[0, -0.12, 0]}>
				<cylinderGeometry args={[0.16, 0.2, 0.24, 24]} />
				<meshStandardMaterial color="#5b3a26" roughness={0.82} />
			</mesh>
			{[
				[-0.1, 0.08, 0, -0.4],
				[0.08, 0.14, -0.05, 0.2],
				[0.02, 0.2, 0.08, 0],
				[-0.04, 0.12, 0.1, 0.45],
			].map(([x, y, z, ry], index) => (
				<mesh key={index} position={[Number(x), Number(y), Number(z)]} rotation={[0.4, Number(ry), 0.2]} castShadow>
					<coneGeometry args={[0.09, 0.32, 10]} />
					<meshStandardMaterial color="#1d6d46" roughness={0.84} />
				</mesh>
			))}
		</group>
	);
}
