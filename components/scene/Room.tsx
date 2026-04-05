'use client';

import * as THREE from 'three';

export function Room() {
	return (
		<group>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
				<planeGeometry args={[22, 22]} />
				<meshStandardMaterial color="#090b11" roughness={0.98} metalness={0} />
			</mesh>

			<mesh position={[0, 2.25, -3.15]} receiveShadow>
				<planeGeometry args={[8.8, 4.8]} />
				<meshStandardMaterial color="#0d1420" roughness={0.94} metalness={0} />
			</mesh>

			<mesh rotation={[0, Math.PI / 2, 0]} position={[-4.4, 2.2, 0]} receiveShadow>
				<planeGeometry args={[7, 4.8]} />
				<meshStandardMaterial color="#0B1018" roughness={0.9} metalness={0} />
			</mesh>

			<mesh rotation={[0, -Math.PI / 2, 0]} position={[4.4, 2.2, 0]} receiveShadow>
				<planeGeometry args={[7, 4.8]} />
				<meshStandardMaterial color="#0B1018" roughness={0.9} metalness={0} />
			</mesh>

			<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.4, 0]} receiveShadow>
				<planeGeometry args={[9, 7]} />
				<meshStandardMaterial color="#090C12" roughness={1} metalness={0} />
			</mesh>

			<mesh position={[-2.15, 2.15, -3.06]}>
				<planeGeometry args={[1.2, 1.5]} />
				<meshStandardMaterial color="#17355d" emissive="#2d5f97" emissiveIntensity={0.45} />
			</mesh>

			<mesh position={[-2.15, 2.15, -3.03]}>
				<planeGeometry args={[1.02, 1.32]} />
				<meshStandardMaterial color="#0a1220" />
			</mesh>

			<mesh position={[-2.15, 2.15, -3.01]}>
				<planeGeometry args={[0.98, 0.02]} />
				<meshBasicMaterial color="#3c4b66" />
			</mesh>

			<mesh position={[-2.15, 2.15, -3.01]}>
				<planeGeometry args={[0.02, 1.28]} />
				<meshBasicMaterial color="#3c4b66" />
			</mesh>

			<mesh position={[0, 0.02, -0.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<ringGeometry args={[1.3, 3.2, 64]} />
				<meshBasicMaterial color="#76b6ff" transparent opacity={0.08} side={THREE.DoubleSide} />
			</mesh>

			<mesh position={[0, 0.75, -1.8]} receiveShadow castShadow>
				<boxGeometry args={[0.96, 0.7, 0.28]} />
				<meshStandardMaterial color="#2b313c" roughness={0.82} />
			</mesh>

			<mesh position={[0, 1.22, -1.8]} receiveShadow castShadow>
				<boxGeometry args={[1.1, 0.1, 0.36]} />
				<meshStandardMaterial color="#333948" roughness={0.72} />
			</mesh>

			<mesh position={[0, 0.44, 1.55]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<circleGeometry args={[1.9, 48]} />
				<meshBasicMaterial color="#281d12" transparent opacity={0.2} side={THREE.DoubleSide} />
			</mesh>

			<mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<ringGeometry args={[1.8, 6.8, 64]} />
				<meshBasicMaterial color="#111827" transparent opacity={0.12} side={THREE.DoubleSide} />
			</mesh>
		</group>
	);
}
