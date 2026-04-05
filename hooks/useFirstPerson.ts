import * as THREE from 'three';

export const COLLISION_BOXES: THREE.Box3[] = [
	new THREE.Box3(new THREE.Vector3(-7, 0, -7.2), new THREE.Vector3(7, 4, -6.5)),
	new THREE.Box3(new THREE.Vector3(-7, 0, 6.5), new THREE.Vector3(7, 4, 7.2)),
	new THREE.Box3(new THREE.Vector3(6.5, 0, -7), new THREE.Vector3(7.2, 4, 7)),
	new THREE.Box3(new THREE.Vector3(-7.2, 0, -7), new THREE.Vector3(-6.5, 4, 7)),
	new THREE.Box3(new THREE.Vector3(-1.35, 0, -3.15), new THREE.Vector3(1.35, 1.15, -0.9)),
	new THREE.Box3(new THREE.Vector3(-0.9, 0, 1.05), new THREE.Vector3(0.9, 1.45, 2.2)),
	new THREE.Box3(new THREE.Vector3(-5.95, 0, -3.4), new THREE.Vector3(-5, 2.3, -1.7)),
];

export function collidesAt(pos: THREE.Vector3): boolean {
	const player = new THREE.Box3(
		new THREE.Vector3(pos.x - 0.3, pos.y - 1.7, pos.z - 0.3),
		new THREE.Vector3(pos.x + 0.3, pos.y + 0.1, pos.z + 0.3)
	);

	return COLLISION_BOXES.some((box) => box.intersectsBox(player));
}
