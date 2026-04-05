'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { experiences, projects, siteConfig, skills } from '@/lib/constants';
import { getPanelMeta } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

function ledText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string) {
	ctx.font = `bold ${size}px monospace`;
	ctx.fillStyle = color;
	ctx.shadowColor = color;
	ctx.shadowBlur = 10;
	ctx.fillText(text, x, y);
	ctx.shadowBlur = 0;
}

export function StadiumScoreboard() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const tickerOffset = useRef(0);
	const hoveredKey = useStore((state) => state.hoveredKey);
	const activePanel = useStore((state) => state.activePanel);

	const texture = useMemo(() => {
		const canvas = document.createElement('canvas');
		canvas.width = 1024;
		canvas.height = 512;
		canvasRef.current = canvas;
		const tex = new THREE.CanvasTexture(canvas);
		tex.colorSpace = THREE.SRGBColorSpace;
		return tex;
	}, []);

	useFrame(({ clock }) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const currentMeta = getPanelMeta((activePanel || hoveredKey) as string);
		tickerOffset.current = (tickerOffset.current + 1.7) % 1600;

		ctx.fillStyle = '#081116';
		ctx.fillRect(0, 0, 1024, 512);
		ctx.fillStyle = '#12202a';
		ctx.fillRect(18, 18, 988, 476);
		ctx.fillStyle = '#1c2a35';
		ctx.fillRect(44, 44, 936, 424);

		ledText(ctx, 'VISHAAL FIELD', 78, 102, 42, '#f6c34e');
		ledText(ctx, 'PORTFOLIO', 744, 102, 32, '#f6c34e');
		ledText(ctx, String(projects.length).padStart(2, '0'), 102, 235, 104, '#f8d96b');
		ledText(ctx, String(skills.length).padStart(2, '0'), 806, 235, 104, '#f8d96b');
		ledText(ctx, 'PROJECTS', 92, 286, 22, '#fff7dd');
		ledText(ctx, 'SKILLS', 796, 286, 22, '#fff7dd');
		ledText(ctx, `EXP ${String(experiences.length).padStart(2, '0')}`, 430, 214, 34, '#f4f7fb');
		ledText(ctx, 'CONNECT  EMAIL  LINKS', 332, 258, 24, '#cfdbe5');
		ledText(ctx, currentMeta?.scoreboardCall ?? 'WELCOME TO THE BALLPARK', 88, 336, 28, '#ffe6a2');

		ctx.fillStyle = '#0a1016';
		ctx.fillRect(70, 376, 884, 78);
		const ticker = `  ${siteConfig.links.github.replace('https://', '')}  |  ${siteConfig.links.linkedin.replace('https://www.', '')}  |  ${projects.length} PROJECTS  |  ${skills.length} SKILLS  |  ${experiences.length} EXPERIENCES  |  `;
		ledText(ctx, ticker, 944 - tickerOffset.current, 425, 22, '#f6e69b');
		ledText(ctx, 'PLAY BALL', 440, 122, 24, Math.sin(clock.elapsedTime * 3) > 0 ? '#f6c34e' : '#7b6848');

		texture.needsUpdate = true;
	});

	return (
		<group position={[0, 5.05, -8.95]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[9.6, 5.3, 0.65]} />
				<meshStandardMaterial color="#14232c" roughness={0.74} />
			</mesh>
			<mesh position={[0, 0, 0.36]}>
				<planeGeometry args={[8.72, 4.6]} />
				<meshStandardMaterial map={texture} emissive="#301f04" emissiveIntensity={0.18} />
			</mesh>
			{[-2.6, 2.6].map((x) => (
				<mesh key={x} position={[x, -3.5, 0]} castShadow receiveShadow>
					<boxGeometry args={[0.45, 2.2, 0.45]} />
					<meshStandardMaterial color="#51616b" roughness={0.86} />
				</mesh>
			))}
			<mesh position={[0, -2.9, -0.18]} castShadow receiveShadow>
				<boxGeometry args={[10.8, 0.54, 0.9]} />
				<meshStandardMaterial color="#446b40" roughness={0.88} />
			</mesh>
		</group>
	);
}
