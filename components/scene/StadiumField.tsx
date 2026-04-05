'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

function makeGrassTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 2048;
	canvas.height = 2048;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Failed to create grass texture');

	const base = ctx.createLinearGradient(0, 0, 2048, 2048);
	base.addColorStop(0, '#5aa46a');
	base.addColorStop(1, '#356f48');
	ctx.fillStyle = base;
	ctx.fillRect(0, 0, 2048, 2048);

	for (let i = 0; i < 18; i += 1) {
		const y = i * 114;
		ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.028)' : 'rgba(0,0,0,0.02)';
		ctx.fillRect(0, y, 2048, 114);
	}

	for (let i = 0; i < 9000; i += 1) {
		const alpha = Math.random() > 0.5 ? 0.008 : 0.012;
		ctx.fillStyle = `rgba(255,255,255,${alpha})`;
		ctx.fillRect(Math.random() * 2048, Math.random() * 2048, 2, 4);
	}

	const vignette = ctx.createRadialGradient(1024, 980, 320, 1024, 980, 1080);
	vignette.addColorStop(0, 'rgba(255,255,255,0)');
	vignette.addColorStop(1, 'rgba(16,38,23,0.16)');
	ctx.fillStyle = vignette;
	ctx.fillRect(0, 0, 2048, 2048);

	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2.35, 2.35);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

function makeDirtTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 1024;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Failed to create dirt texture');

	const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
	gradient.addColorStop(0, '#cb9a61');
	gradient.addColorStop(1, '#a77445');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 1024, 1024);

	for (let i = 0; i < 6000; i += 1) {
		const color = Math.random() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(111,72,30,0.09)';
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 3.2, 0, Math.PI * 2);
		ctx.fill();
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1.8, 1.8);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

function homePlateShape() {
	const shape = new THREE.Shape();
	shape.moveTo(-0.34, -0.32);
	shape.lineTo(0.34, -0.32);
	shape.lineTo(0.46, -0.04);
	shape.lineTo(0, 0.44);
	shape.lineTo(-0.46, -0.04);
	shape.closePath();
	return shape;
}

export function StadiumField() {
	const grassTexture = useMemo(() => makeGrassTexture(), []);
	const dirtTexture = useMemo(() => makeDirtTexture(), []);
	const plateShape = useMemo(() => homePlateShape(), []);
	const basePositions = useMemo(
		() =>
			[
				[4.7, 0.06, 5.4],
				[0, 0.06, 0.7],
				[-4.7, 0.06, 5.4],
			] as [number, number, number][],
		[]
	);
	const wallPanels = useMemo(
		() => [
			{ position: [-11.4, 2.7, -8.6] as [number, number, number], rotation: [0, 0.14, 0] as [number, number, number], size: [10.2, 4.8, 0.52] as [number, number, number] },
			{ position: [0, 3.05, -9.3] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], size: [12.8, 5.6, 0.6] as [number, number, number] },
			{ position: [11.4, 2.7, -8.6] as [number, number, number], rotation: [0, -0.14, 0] as [number, number, number], size: [10.2, 4.8, 0.52] as [number, number, number] },
		],
		[]
	);

	return (
		<group>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]} receiveShadow>
				<cylinderGeometry args={[42, 42, 0.36, 96]} />
				<meshStandardMaterial color="#a4bb8f" roughness={1} />
			</mesh>

			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<circleGeometry args={[35.2, 160]} />
				<meshStandardMaterial map={grassTexture} roughness={0.94} metalness={0} />
			</mesh>

			<mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[0, 0.03, 5.45]} receiveShadow>
				<planeGeometry args={[7.4, 7.4]} />
				<meshStandardMaterial map={dirtTexture} roughness={0.98} />
			</mesh>

			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.032, 9.42]} receiveShadow>
				<circleGeometry args={[1.68, 56]} />
				<meshStandardMaterial map={dirtTexture} roughness={1} />
			</mesh>

			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.036, 4.05]} receiveShadow>
				<circleGeometry args={[1.12, 48]} />
				<meshStandardMaterial map={dirtTexture} roughness={1} />
			</mesh>

			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.042, 4.05]} receiveShadow>
				<circleGeometry args={[0.34, 32]} />
				<meshStandardMaterial color="#d9c08a" roughness={0.98} />
			</mesh>

			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 4.05]} receiveShadow>
				<boxGeometry args={[0.54, 0.06, 0.12]} />
				<meshStandardMaterial color="#faf7ef" roughness={0.95} />
			</mesh>

			{basePositions.map((position, index) => (
				<mesh key={index} position={position} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
					<boxGeometry args={[0.58, 0.12, 0.58]} />
					<meshStandardMaterial color="#faf7ef" roughness={0.9} />
				</mesh>
			))}

			<mesh position={[0, 0.055, 10.15]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
				<shapeGeometry args={[plateShape]} />
				<meshStandardMaterial color="#faf7ef" roughness={0.95} />
			</mesh>

			{[
				[[0, 0.055, 10.15], [-27.2, 0.055, -20.8]],
				[[0, 0.055, 10.15], [27.2, 0.055, -20.8]],
			].map(([start, end], index) => {
				const startVec = new THREE.Vector3(...(start as [number, number, number]));
				const endVec = new THREE.Vector3(...(end as [number, number, number]));
				const mid = startVec.clone().lerp(endVec, 0.5);
				const length = startVec.distanceTo(endVec);
				const angle = Math.atan2(endVec.z - startVec.z, endVec.x - startVec.x);
				return (
					<mesh key={index} position={[mid.x, 0.06, mid.z]} rotation={[-Math.PI / 2, 0, angle]} receiveShadow>
						<planeGeometry args={[length, 0.08]} />
						<meshStandardMaterial color="#fbfaf6" roughness={1} />
					</mesh>
				);
			})}

			{wallPanels.map((panel, index) => (
				<group key={index} position={panel.position} rotation={panel.rotation}>
					<mesh castShadow receiveShadow>
						<boxGeometry args={panel.size} />
						<meshStandardMaterial color={index === 1 ? '#2b5a3f' : '#234a33'} roughness={0.9} />
					</mesh>
					<mesh position={[0, panel.size[1] / 2 + 0.14, 0]}>
						<boxGeometry args={[panel.size[0] + 0.32, 0.18, panel.size[2] + 0.08]} />
						<meshStandardMaterial color="#cfa873" roughness={0.82} />
					</mesh>
				</group>
			))}
		</group>
	);
}
