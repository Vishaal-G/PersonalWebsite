'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function populate(mesh: THREE.InstancedMesh, matrices: THREE.Matrix4[]) {
	matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
	mesh.instanceMatrix.needsUpdate = true;
}

export function StadiumCrowd() {
	const seatsRef = useRef<THREE.InstancedMesh>(null);
	const crowdRef = useRef<THREE.InstancedMesh>(null);

	const { seatMatrices, crowdMatrices, offsets } = useMemo(() => {
		const seats: THREE.Matrix4[] = [];
		const crowd: THREE.Matrix4[] = [];
		const waveOffsets: number[] = [];
		const dummy = new THREE.Object3D();

		const addArc = (radius: number, y: number, count: number, start: number, end: number) => {
			for (let i = 0; i < count; i += 1) {
				const t = i / (count - 1);
				const angle = start + (end - start) * t;
				const x = Math.sin(angle) * radius;
				const z = -Math.cos(angle) * radius - 2.4;

				dummy.position.set(x, y, z);
				dummy.lookAt(0, y + 0.2, 3.8);
				dummy.updateMatrix();
				seats.push(dummy.matrix.clone());

				dummy.position.set(x, y + 0.56, z);
				dummy.scale.set(0.26, 0.56, 0.26);
				dummy.updateMatrix();
				crowd.push(dummy.matrix.clone());
				waveOffsets.push(Math.random() * Math.PI * 2);
				dummy.scale.set(1, 1, 1);
			}
		};

		[0, 1, 2, 3].forEach((row) => addArc(19 + row * 1.8, 1.15 + row * 0.48, 34, -1.22, 1.22));
		[0, 1, 2].forEach((row) => {
			addArc(22.8 + row * 1.4, 2.1 + row * 0.48, 18, -2.14, -1.34);
			addArc(22.8 + row * 1.4, 2.1 + row * 0.48, 18, 1.34, 2.14);
		});

		return { seatMatrices: seats, crowdMatrices: crowd, offsets: waveOffsets };
	}, []);

	useEffect(() => {
		if (seatsRef.current) populate(seatsRef.current, seatMatrices);
		if (crowdRef.current) populate(crowdRef.current, crowdMatrices);
	}, [crowdMatrices, seatMatrices]);

	useFrame(({ clock }) => {
		if (!crowdRef.current) return;
		const dummy = new THREE.Object3D();
		for (let i = 0; i < crowdMatrices.length; i += 1) {
			crowdMatrices[i].decompose(dummy.position, dummy.quaternion, dummy.scale);
			dummy.rotation.set(Math.sin(clock.elapsedTime * 1.6 + offsets[i]) * 0.08, 0, 0);
			dummy.updateMatrix();
			crowdRef.current.setMatrixAt(i, dummy.matrix);
		}
		crowdRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<group>
			<instancedMesh ref={seatsRef} args={[undefined, undefined, seatMatrices.length]} castShadow receiveShadow>
				<boxGeometry args={[0.52, 0.18, 0.46]} />
				<meshStandardMaterial color="#355f47" roughness={0.92} />
			</instancedMesh>
			<instancedMesh ref={crowdRef} args={[undefined, undefined, crowdMatrices.length]} castShadow>
				<capsuleGeometry args={[0.12, 0.34, 4, 8]} />
				<meshStandardMaterial color="#d3dde6" roughness={0.95} />
			</instancedMesh>
		</group>
	);
}
