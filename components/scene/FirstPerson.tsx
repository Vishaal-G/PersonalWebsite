'use client';

import { useCallback, useEffect, useRef } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib';

import { collidesAt } from '@/hooks/useFirstPerson';
import { useStore } from '@/store/useStore';

const SPEED = 4.5;
const FRICTION = 12;
const HEIGHT = 1.7;
const RANGE = 2.8;
const BOB_FREQ = 1.8;
const BOB_AMP = 0.02;

export function FirstPerson() {
	const { camera, gl, scene } = useThree();
	const ctrlRef = useRef<PointerLockControlsImpl>(null);
	const vel = useRef(new THREE.Vector3());
	const keys = useRef({ w: false, a: false, s: false, d: false });
	const bobT = useRef(0);
	const ray = useRef(new THREE.Raycaster());
	const pointer = useRef(new THREE.Vector2(0, 0));
	const {
		setLocked,
		overlayVisible,
		hasEntered,
		setHoveredObject,
		setActivePanel,
		setOverlayVisible,
		markVisited,
	} = useStore();

	useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (event.code === 'KeyW' || event.code === 'ArrowUp') keys.current.w = true;
			if (event.code === 'KeyA' || event.code === 'ArrowLeft') keys.current.a = true;
			if (event.code === 'KeyS' || event.code === 'ArrowDown') keys.current.s = true;
			if (event.code === 'KeyD' || event.code === 'ArrowRight') keys.current.d = true;
		};

		const up = (event: KeyboardEvent) => {
			if (event.code === 'KeyW' || event.code === 'ArrowUp') keys.current.w = false;
			if (event.code === 'KeyA' || event.code === 'ArrowLeft') keys.current.a = false;
			if (event.code === 'KeyS' || event.code === 'ArrowDown') keys.current.s = false;
			if (event.code === 'KeyD' || event.code === 'ArrowRight') keys.current.d = false;
		};

		window.addEventListener('keydown', down);
		window.addEventListener('keyup', up);

		return () => {
			window.removeEventListener('keydown', down);
			window.removeEventListener('keyup', up);
		};
	}, []);

	useEffect(() => {
		const ctrl = ctrlRef.current;
		if (!ctrl) {
			return;
		}

		const onLock = () => setLocked(true);
		const onUnlock = () => {
			setLocked(false);
			Object.assign(keys.current, { w: false, a: false, s: false, d: false });
		};

		ctrl.addEventListener('lock', onLock);
		ctrl.addEventListener('unlock', onUnlock);

		return () => {
			ctrl.removeEventListener('lock', onLock);
			ctrl.removeEventListener('unlock', onUnlock);
		};
	}, [setLocked]);

	useFrame((_, delta) => {
		if (overlayVisible) {
			return;
		}

		const controls = ctrlRef.current;
		const locked = controls?.isLocked ?? false;

		if (locked && controls) {
			const { w, a, s, d } = keys.current;
			const dir = new THREE.Vector3();
			if (w) dir.z -= 1;
			if (s) dir.z += 1;
			if (a) dir.x -= 1;
			if (d) dir.x += 1;
			dir.normalize();

			vel.current.x -= vel.current.x * FRICTION * delta;
			vel.current.z -= vel.current.z * FRICTION * delta;
			vel.current.x += dir.x * SPEED * delta;
			vel.current.z += dir.z * SPEED * delta;

			const obj = controls.getObject();
			const curr = obj.position.clone();
			const nextX = curr.clone().add(new THREE.Vector3(vel.current.x * delta * 10, 0, 0));
			const nextZ = curr.clone().add(new THREE.Vector3(0, 0, vel.current.z * delta * 10));

			if (!collidesAt(nextX)) {
				controls.moveRight(vel.current.x * delta);
			}
			if (!collidesAt(nextZ)) {
				controls.moveForward(-vel.current.z * delta);
			}

			obj.position.y = HEIGHT;
			const speed = Math.abs(vel.current.x) + Math.abs(vel.current.z);
			if (speed > 0.05) {
				bobT.current += delta * BOB_FREQ * Math.PI * 2;
				obj.position.y = HEIGHT + Math.sin(bobT.current) * BOB_AMP;
			}
		}

		ray.current.setFromCamera(pointer.current, camera);
		const hits = ray.current.intersectObjects(scene.children, true);
		const hit = hits.find((item) => item.object.userData.interactive && item.distance < RANGE);
		setHoveredObject((hit?.object.userData.panelKey as ReturnType<typeof useStore.getState>['hoveredObject']) ?? null);
	});

	const handleCanvasClick = useCallback(() => {
		const state = useStore.getState();
		if (!state.hasEntered || state.overlayVisible) {
			return;
		}

		if (state.hoveredObject) {
			state.setActivePanel(state.hoveredObject);
			state.setOverlayVisible(true);
			state.markVisited(state.hoveredObject);
			ctrlRef.current?.unlock();
			return;
		}

		if (!ctrlRef.current?.isLocked) {
			ctrlRef.current?.lock();
		}
	}, []);

	useEffect(() => {
		const canvas = gl.domElement;
		canvas.addEventListener('click', handleCanvasClick);
		return () => canvas.removeEventListener('click', handleCanvasClick);
	}, [gl, handleCanvasClick]);

	return <PointerLockControls ref={ctrlRef} />;
}
