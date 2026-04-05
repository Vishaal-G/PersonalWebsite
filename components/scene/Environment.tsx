'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

function makeCityTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 512;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Unable to create city texture');
	}

	const gradient = ctx.createLinearGradient(0, 0, 0, 512);
	gradient.addColorStop(0, '#07111d');
	gradient.addColorStop(0.5, '#081524');
	gradient.addColorStop(1, '#04070d');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 1024, 512);

	for (let i = 0; i < 90; i += 1) {
		const width = 20 + Math.random() * 36;
		const height = 100 + Math.random() * 240;
		const x = i * 12 + Math.random() * 18;
		const y = 512 - height;
		ctx.fillStyle = i % 3 === 0 ? '#09111a' : '#0b1623';
		ctx.fillRect(x, y, width, height);

		for (let row = y + 12; row < 512; row += 14) {
			for (let col = x + 5; col < x + width - 3; col += 8) {
				if (Math.random() > 0.45) {
					ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255,208,115,0.8)' : 'rgba(125,184,255,0.65)';
					ctx.fillRect(col, row, 3, 5);
				}
			}
		}
	}

	for (let i = 0; i < 140; i += 1) {
		ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.5})`;
		ctx.beginPath();
		ctx.arc(Math.random() * 1024, Math.random() * 180, Math.random() * 1.4, 0, Math.PI * 2);
		ctx.fill();
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

export function RoomEnvironment() {
	const cityTexture = useMemo(() => makeCityTexture(), []);

	return (
		<group>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
				<planeGeometry args={[24, 24]} />
				<meshStandardMaterial color="#06090f" roughness={0.96} />
			</mesh>

			<mesh position={[0, 3.2, -6]} receiveShadow>
				<planeGeometry args={[14, 8]} />
				<meshStandardMaterial color="#0a0f17" roughness={0.96} />
			</mesh>

			<mesh rotation={[0, Math.PI / 2, 0]} position={[-6.4, 3.2, 0]} receiveShadow>
				<planeGeometry args={[12, 8]} />
				<meshStandardMaterial color="#070b12" roughness={0.98} />
			</mesh>

			<mesh rotation={[0, -Math.PI / 2, 0]} position={[6.4, 3.2, 0]} receiveShadow>
				<planeGeometry args={[12, 8]} />
				<meshStandardMaterial color="#090d14" roughness={0.98} />
			</mesh>

			<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.9, 0]} receiveShadow>
				<planeGeometry args={[14, 12]} />
				<meshStandardMaterial color="#06080d" roughness={1} />
			</mesh>

			<mesh position={[-2.45, 3.15, -5.92]}>
				<planeGeometry args={[3.6, 2.8]} />
				<meshStandardMaterial color="#24364d" emissive="#315e96" emissiveIntensity={0.32} />
			</mesh>
			<mesh position={[-2.45, 3.15, -5.9]}>
				<planeGeometry args={[3.1, 2.35]} />
				<meshStandardMaterial map={cityTexture} emissive="#18345a" emissiveIntensity={0.18} toneMapped={false} />
			</mesh>
			<mesh position={[-2.45, 3.15, -5.88]}>
				<planeGeometry args={[3.16, 0.04]} />
				<meshBasicMaterial color="#31445b" />
			</mesh>
			<mesh position={[-2.45, 3.15, -5.88]}>
				<planeGeometry args={[0.04, 2.4]} />
				<meshBasicMaterial color="#31445b" />
			</mesh>

			<mesh position={[2.85, 2.4, -5.82]} receiveShadow castShadow>
				<boxGeometry args={[1.5, 2.5, 0.42]} />
				<meshStandardMaterial color="#262c36" roughness={0.84} />
			</mesh>
			{[-0.8, 0, 0.8].map((y) => (
				<mesh key={y} position={[2.85, 2.4 + y, -5.58]}>
					<boxGeometry args={[1.28, 0.04, 0.12]} />
					<meshStandardMaterial color="#20262f" roughness={0.9} />
				</mesh>
			))}

			<mesh position={[0, 0.02, 0.75]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<ringGeometry args={[1.6, 3.7, 64]} />
				<meshBasicMaterial color="#c6863f" transparent opacity={0.07} side={THREE.DoubleSide} />
			</mesh>
		</group>
	);
}
