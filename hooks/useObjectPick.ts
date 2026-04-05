'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface PickState {
	pos: THREE.Vector3;
	rot: THREE.Euler;
	scale: THREE.Vector3;
}

export function useObjectPick(panelKey: string) {
	const meshRef = useRef<THREE.Group>(null);
	const saved = useRef<PickState | null>(null);
	const { camera } = useThree();

	useEffect(() => {
		const onPick = (event: Event) => {
			const detail = (event as CustomEvent<{ key: string }>).detail;
			if (detail?.key !== panelKey) {
				return;
			}

			const obj = meshRef.current;
			if (!obj) {
				return;
			}

			saved.current = {
				pos: obj.position.clone(),
				rot: obj.rotation.clone(),
				scale: obj.scale.clone(),
			};

			const dir = new THREE.Vector3();
			camera.getWorldDirection(dir);
			const target = camera.position.clone().add(dir.multiplyScalar(1.5));
			target.y = Math.max(target.y, 1.05);

			gsap.to(obj.position, {
				x: target.x,
				y: target.y + 0.1,
				z: target.z,
				duration: 0.4,
				ease: 'back.out(1.6)',
			});
			gsap.to(obj.scale, {
				x: 1.25,
				y: 1.25,
				z: 1.25,
				duration: 0.4,
				ease: 'back.out(1.6)',
			});
			gsap.to(obj.rotation, {
				y: obj.rotation.y + 0.15,
				duration: 0.4,
				ease: 'power2.out',
			});
		};

		const onClose = () => {
			const obj = meshRef.current;
			const orig = saved.current;
			if (!obj || !orig) {
				return;
			}

			gsap.to(obj.position, {
				x: orig.pos.x,
				y: orig.pos.y,
				z: orig.pos.z,
				duration: 0.38,
				ease: 'power2.inOut',
			});
			gsap.to(obj.scale, {
				x: orig.scale.x,
				y: orig.scale.y,
				z: orig.scale.z,
				duration: 0.38,
				ease: 'power2.inOut',
			});
			gsap.to(obj.rotation, {
				x: orig.rot.x,
				y: orig.rot.y,
				z: orig.rot.z,
				duration: 0.38,
				ease: 'power2.inOut',
				onComplete: () => {
					saved.current = null;
				},
			});
		};

		window.addEventListener('object-picked', onPick as EventListener);
		window.addEventListener('panel-close', onClose);
		return () => {
			window.removeEventListener('object-picked', onPick as EventListener);
			window.removeEventListener('panel-close', onClose);
		};
	}, [camera, panelKey]);

	return { meshRef };
}
