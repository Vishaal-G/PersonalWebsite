'use client';

import * as THREE from 'three';

function applyTextureDefaults(texture: THREE.CanvasTexture) {
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.needsUpdate = true;
	return texture;
}

export function makeWalnutTexture(): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 512;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Unable to create walnut texture');
	}

	ctx.fillStyle = '#3d1f0a';
	ctx.fillRect(0, 0, 1024, 512);

	for (let i = 0; i < 120; i += 1) {
		const x = i * 8.5 + Math.sin(i * 0.4) * 6;
		const col = i % 3 === 0 ? '#5c3210' : '#4a2808';
		ctx.strokeStyle = col;
		ctx.lineWidth = 0.8 + Math.random() * 1.2;
		ctx.globalAlpha = 0.08 + Math.random() * 0.14;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		for (let y = 0; y < 512; y += 40) {
			ctx.lineTo(x + Math.sin(y * 0.04 + i) * 3, y);
		}
		ctx.stroke();
	}

	ctx.globalAlpha = 1;
	const texture = applyTextureDefaults(new THREE.CanvasTexture(canvas));
	texture.repeat.set(2, 1);
	return texture;
}

export function makeLeatherTexture(): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Unable to create leather texture');
	}

	ctx.fillStyle = '#0d0d18';
	ctx.fillRect(0, 0, 256, 256);

	for (let i = 0; i < 1200; i += 1) {
		const x = Math.random() * 256;
		const y = Math.random() * 256;
		ctx.fillStyle = Math.random() > 0.5 ? '#14141f' : '#0a0a14';
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.arc(x, y, Math.random() * 1.8, 0, Math.PI * 2);
		ctx.fill();
	}

	ctx.globalAlpha = 1;
	return applyTextureDefaults(new THREE.CanvasTexture(canvas));
}

export function makeGoldTexture(): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 64;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Unable to create gold texture');
	}

	ctx.fillStyle = '#b8860b';
	ctx.fillRect(0, 0, 256, 64);

	for (let y = 0; y < 64; y += 1) {
		ctx.strokeStyle = y % 2 === 0 ? '#d4a017' : '#a07400';
		ctx.globalAlpha = 0.15;
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(256, y);
		ctx.stroke();
	}

	ctx.globalAlpha = 1;
	return applyTextureDefaults(new THREE.CanvasTexture(canvas));
}

export function makeNotebookTexture(): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Unable to create notebook texture');
	}

	ctx.fillStyle = '#2c1810';
	ctx.fillRect(0, 0, 256, 256);

	for (let i = 0; i < 8; i += 1) {
		ctx.strokeStyle = '#1a0e08';
		ctx.lineWidth = 0.5 + Math.random();
		ctx.globalAlpha = 0.2;
		ctx.beginPath();
		ctx.moveTo(Math.random() * 256, 0);
		ctx.quadraticCurveTo(Math.random() * 256, 128, Math.random() * 256, 256);
		ctx.stroke();
	}

	ctx.globalAlpha = 1;
	return applyTextureDefaults(new THREE.CanvasTexture(canvas));
}
