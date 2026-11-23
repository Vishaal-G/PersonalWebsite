'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

import { BasePathTrail } from '@/components/scene/BasePathTrail';
import { StadiumScoreboard } from '@/components/scene/StadiumScoreboard';
import { StadiumZone } from '@/components/scene/StadiumZone';
import { useHoverGlow } from '@/hooks/useHoverGlow';
import { useStore } from '@/store/useStore';

function makeSignTexture(title: string, subtitle: string, tint: string, badge: string) {
	const canvas = document.createElement('canvas');
	canvas.width = 640;
	canvas.height = 280;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Failed to create sign texture');

	ctx.fillStyle = '#f8f4e8';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = tint;
	ctx.fillRect(0, 0, canvas.width, 18);

	ctx.strokeStyle = '#314739';
	ctx.lineWidth = 2;
	ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

	ctx.fillStyle = '#1a3323';
	ctx.font = '700 54px Trebuchet MS';
	ctx.textAlign = 'center';
	ctx.fillText(title, canvas.width / 2, 132);
	ctx.font = '600 22px Trebuchet MS';
	ctx.fillStyle = '#44614e';
	ctx.fillText(subtitle.toUpperCase(), canvas.width / 2, 186);

	ctx.fillStyle = '#2d5d39';
	ctx.beginPath();
	ctx.arc(64, 64, 40, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = '#f9fbf5';
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(64, 64, 36, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = '#f9fbf5';
	ctx.font = '700 44px Trebuchet MS';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(badge, 64, 68);
	ctx.textBaseline = 'alphabetic';

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

function SignBoard({
	title,
	subtitle,
	tint,
	hoverKey,
	badge,
	scale = 1,
}: {
	title: string;
	subtitle: string;
	tint: string;
	hoverKey: string;
	badge: string;
	scale?: number;
}) {
	const texture = useMemo(() => makeSignTexture(title, subtitle, tint, badge), [subtitle, tint, title, badge]);
	const ref = useHoverGlow(hoverKey);

	return (
		<mesh castShadow receiveShadow scale={scale}>
			<planeGeometry args={[1.52, 0.72]} />
			<meshStandardMaterial ref={ref} map={texture} emissive={tint} emissiveIntensity={0} side={THREE.DoubleSide} />
		</mesh>
	);
}

function AvatarPlayer() {
	const groupRef = useRef<THREE.Group>(null);
	const activePanel = useStore((state) => state.activePanel);

	useEffect(() => {
		if (!groupRef.current) return;
		const targetMap = {
			hero: { position: [0, 0.22, 11.35], rotationY: 0 },
			about: { position: [4.08, 0.22, 6.15], rotationY: -0.28 },
			skills: { position: [0.3, 0.22, 1.02], rotationY: 0.04 },
			projects: { position: [-4.08, 0.22, 6.15], rotationY: 0.28 },
			contact: { position: [5.79, 0.22, 11.86], rotationY: -0.24 },
			null: { position: [0, 0.22, 11.35], rotationY: 0 },
		} as const;

		const target = targetMap[(activePanel ?? 'null') as keyof typeof targetMap] ?? targetMap.null;
		gsap.to(groupRef.current.position, {
			x: target.position[0],
			y: target.position[1],
			z: target.position[2],
			duration: 0.6,
			ease: 'power2.out',
		});
		gsap.to(groupRef.current.rotation, {
			y: target.rotationY,
			duration: 0.45,
			ease: 'power2.out',
		});
	}, [activePanel]);

	return (
		<group ref={groupRef} position={[0, 0.22, 11.35]}>
			<mesh castShadow receiveShadow position={[0, 0.9, 0]}>
				<sphereGeometry args={[0.22, 20, 20]} />
				<meshStandardMaterial color="#f2c6a5" roughness={0.88} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0.5, 0]}>
				<capsuleGeometry args={[0.18, 0.46, 6, 10]} />
				<meshStandardMaterial color="#1d5a8a" roughness={0.86} />
			</mesh>
			<mesh castShadow receiveShadow position={[-0.11, 0.08, 0]}>
				<boxGeometry args={[0.11, 0.36, 0.11]} />
				<meshStandardMaterial color="#f1f1f1" roughness={0.9} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.11, 0.08, 0]}>
				<boxGeometry args={[0.11, 0.36, 0.11]} />
				<meshStandardMaterial color="#f1f1f1" roughness={0.9} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 1.04, 0.07]} rotation={[0.18, 0, 0]}>
				<cylinderGeometry args={[0.23, 0.24, 0.08, 20]} />
				<meshStandardMaterial color="#133e63" roughness={0.84} />
			</mesh>
		</group>
	);
}

function BasePortal({
	hoverKey,
	panelKey,
	position,
	title,
	subtitle,
	color,
	order,
	markerPosition = [0, 0, -0.62],
	markerRotationY = 0,
	boardScale = 1,
}: {
	hoverKey: 'hero' | 'about' | 'skills' | 'projects';
	panelKey: 'hero' | 'about' | 'skills' | 'projects';
	position: [number, number, number];
	title: string;
	subtitle: string;
	color: string;
	order: number;
	markerPosition?: [number, number, number];
	markerRotationY?: number;
	boardScale?: number;
}) {
	return (
		<StadiumZone hoverKey={hoverKey} panelKey={panelKey} position={position}>
			<group position={markerPosition} rotation={[0, markerRotationY, 0]}>
				<mesh position={[-0.42, 0.38, 0]} castShadow receiveShadow>
					<boxGeometry args={[0.08, 0.76, 0.08]} />
					<meshStandardMaterial color="#385842" roughness={0.92} />
				</mesh>
				<mesh position={[0.42, 0.38, 0]} castShadow receiveShadow>
					<boxGeometry args={[0.08, 0.76, 0.08]} />
					<meshStandardMaterial color="#385842" roughness={0.92} />
				</mesh>
				<mesh position={[0, 0.94, 0.01]} rotation={[-0.06, 0, 0]}>
					<SignBoard title={title} subtitle={subtitle} tint={color} hoverKey={hoverKey} badge={String(order)} scale={boardScale} />
				</mesh>
			</group>
			<mesh position={[0, 0.4, 0]}>
				<boxGeometry args={[1.8, 0.95, 1.8]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
			</mesh>
		</StadiumZone>
	);
}

function MoundMarker() {
	return (
		<group position={[0, 0.02, 4.05]}>
			<mesh position={[0, 0.2, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[0.72, 0.82, 0.24, 32]} />
				<meshStandardMaterial color="#f4efe0" roughness={0.92} />
			</mesh>
			<mesh position={[0, 0.32, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
				<meshStandardMaterial color="#d9c08a" roughness={0.98} />
			</mesh>
		</group>
	);
}

function ContactDugout() {
	return (
		<StadiumZone hoverKey="contact" panelKey="contact" position={[6.1, 0.02, 10.6]} rotation={[0, -0.24, 0]}>
			{/* back wall */}
			<mesh position={[0, 0.55, -0.5]} castShadow receiveShadow>
				<boxGeometry args={[2.2, 1.1, 0.14]} />
				<meshStandardMaterial color="#2b5a3f" roughness={0.88} />
			</mesh>
			{/* side walls */}
			<mesh position={[-1.03, 0.5, -0.1]} castShadow receiveShadow>
				<boxGeometry args={[0.14, 1.0, 0.9]} />
				<meshStandardMaterial color="#2b5a3f" roughness={0.88} />
			</mesh>
			<mesh position={[1.03, 0.5, -0.1]} castShadow receiveShadow>
				<boxGeometry args={[0.14, 1.0, 0.9]} />
				<meshStandardMaterial color="#2b5a3f" roughness={0.88} />
			</mesh>
			{/* bench seat */}
			<mesh position={[0, 0.32, -0.25]} castShadow receiveShadow>
				<boxGeometry args={[1.9, 0.08, 0.5]} />
				<meshStandardMaterial color="#8a6a44" roughness={0.85} />
			</mesh>
			{/* front support posts */}
			<mesh position={[-1, 0.5, 0.42]} castShadow receiveShadow>
				<cylinderGeometry args={[0.05, 0.05, 1, 12]} />
				<meshStandardMaterial color="#385842" roughness={0.9} />
			</mesh>
			<mesh position={[1, 0.5, 0.42]} castShadow receiveShadow>
				<cylinderGeometry args={[0.05, 0.05, 1, 12]} />
				<meshStandardMaterial color="#385842" roughness={0.9} />
			</mesh>
			{/* overhanging roof */}
			<mesh position={[0, 1.05, 0]} rotation={[-0.12, 0, 0]} castShadow receiveShadow>
				<boxGeometry args={[2.3, 0.1, 1.35]} />
				<meshStandardMaterial color="#1f3f2c" roughness={0.82} />
			</mesh>
			{/* sign posted above the roof */}
			<mesh position={[-0.42, 1.28, 0.2]} castShadow receiveShadow>
				<boxGeometry args={[0.07, 0.42, 0.07]} />
				<meshStandardMaterial color="#385842" roughness={0.92} />
			</mesh>
			<mesh position={[0.42, 1.28, 0.2]} castShadow receiveShadow>
				<boxGeometry args={[0.07, 0.42, 0.07]} />
				<meshStandardMaterial color="#385842" roughness={0.92} />
			</mesh>
			<mesh position={[0, 1.54, 0.2]} rotation={[-0.06, 0, 0]}>
				<SignBoard title="CONTACT" subtitle="dugout" tint="#c9e7c0" hoverKey="contact" badge="5" scale={0.78} />
			</mesh>
			<mesh position={[0, 0.7, 0]}>
				<boxGeometry args={[2.4, 2.2, 1.7]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
			</mesh>
		</StadiumZone>
	);
}

function ExperienceBoard() {
	return <StadiumScoreboard />;
}

export function StadiumZones() {
	return (
		<group>
			<BasePathTrail />
			<AvatarPlayer />

			<BasePortal
				hoverKey="about"
				panelKey="about"
				position={[4.7, 0.06, 5.4]}
				title="ABOUT"
				subtitle="who I am"
				color="#7dbef3"
				order={1}
				markerPosition={[1, 0.04, 0.26]}
				markerRotationY={-0.06}
				boardScale={0.94}
			/>
			<BasePortal
				hoverKey="skills"
				panelKey="skills"
				position={[0, 0.06, 0.7]}
				title="SKILLS"
				subtitle="toolkit"
				color="#ece28a"
				order={2}
				markerPosition={[0.86, 0.04, 0.1]}
				markerRotationY={-0.02}
				boardScale={0.92}
			/>
			<BasePortal
				hoverKey="projects"
				panelKey="projects"
				position={[-4.7, 0.06, 5.4]}
				title="BUILD"
				subtitle="projects"
				color="#ed9aa2"
				order={3}
				markerPosition={[-1, 0.04, 0.26]}
				markerRotationY={0.06}
				boardScale={0.94}
			/>
			<BasePortal
				hoverKey="hero"
				panelKey="hero"
				position={[0, 0.06, 10.15]}
				title="HOME"
				subtitle="my work"
				color="#f1c14b"
				order={4}
				markerPosition={[1.04, 0.04, 0.42]}
				markerRotationY={-0.04}
				boardScale={0.96}
			/>

			<MoundMarker />
			<ExperienceBoard />
			<ContactDugout />
		</group>
	);
}
