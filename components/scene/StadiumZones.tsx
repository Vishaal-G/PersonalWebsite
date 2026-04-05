'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

import { StadiumScoreboard } from '@/components/scene/StadiumScoreboard';
import { StadiumZone } from '@/components/scene/StadiumZone';
import { useHoverGlow } from '@/hooks/useHoverGlow';
import { useStore } from '@/store/useStore';

function makeSignTexture(title: string, subtitle: string, tint: string) {
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

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

function SignBoard({
	title,
	subtitle,
	tint,
	hoverKey,
	scale = 1,
}: {
	title: string;
	subtitle: string;
	tint: string;
	hoverKey: string;
	scale?: number;
}) {
	const texture = useMemo(() => makeSignTexture(title, subtitle, tint), [subtitle, tint, title]);
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
			education: { position: [0, 0.22, 4.2], rotationY: 0 },
			experience: { position: [0, 0.22, 1.95], rotationY: 0 },
			contact: { position: [5.9, 0.22, 10.8], rotationY: -0.26 },
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
					<SignBoard title={title} subtitle={subtitle} tint={color} hoverKey={hoverKey} scale={boardScale} />
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
		<StadiumZone hoverKey="education" panelKey="education" position={[0, 0.02, 4.05]}>
			<mesh position={[0, 0.2, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[0.72, 0.82, 0.24, 32]} />
				<meshStandardMaterial color="#f4efe0" roughness={0.92} />
			</mesh>
			<mesh position={[0, 0.46, 0]} rotation={[-0.28, 0, 0]}>
				<SignBoard title="SCHOOL" subtitle="education" tint="#d8e8f7" hoverKey="education" scale={0.82} />
			</mesh>
			<mesh position={[0, 0.2, 0]}>
				<cylinderGeometry args={[1.18, 1.18, 0.02, 32]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
			</mesh>
		</StadiumZone>
	);
}

function ContactDugout() {
	return (
		<StadiumZone hoverKey="contact" panelKey="contact" position={[6.1, 0.02, 10.6]} rotation={[0, -0.24, 0]}>
			<mesh position={[0, 0.16, 0]} castShadow receiveShadow>
				<boxGeometry args={[1.9, 0.28, 1.1]} />
				<meshStandardMaterial color="#f4efe0" roughness={0.92} />
			</mesh>
			<mesh position={[0, 0.88, -0.38]} castShadow receiveShadow>
				<boxGeometry args={[2.1, 0.12, 0.9]} />
				<meshStandardMaterial color="#2b5a3f" roughness={0.88} />
			</mesh>
			<mesh position={[-0.78, 0.54, -0.36]} castShadow receiveShadow>
				<boxGeometry args={[0.12, 0.82, 0.12]} />
				<meshStandardMaterial color="#385842" roughness={0.92} />
			</mesh>
			<mesh position={[0.78, 0.54, -0.36]} castShadow receiveShadow>
				<boxGeometry args={[0.12, 0.82, 0.12]} />
				<meshStandardMaterial color="#385842" roughness={0.92} />
			</mesh>
			<mesh position={[0, 1.12, -0.24]} rotation={[-0.06, 0, 0]}>
				<SignBoard title="CONTACT" subtitle="dugout" tint="#c9e7c0" hoverKey="contact" scale={0.78} />
			</mesh>
			<mesh position={[0, 0.56, 0]}>
				<boxGeometry args={[2.3, 1.6, 1.4]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
			</mesh>
		</StadiumZone>
	);
}

function ExperienceBoard() {
	return (
		<StadiumZone hoverKey="experience" panelKey="experience" position={[0, 0, 0]}>
			<StadiumScoreboard />
			<mesh position={[0, 4.2, -8.6]}>
				<boxGeometry args={[20.5, 8.8, 4.6]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} depthTest={false} />
			</mesh>
		</StadiumZone>
	);
}

export function StadiumZones() {
	return (
		<group>
			<AvatarPlayer />

			<BasePortal
				hoverKey="hero"
				panelKey="hero"
				position={[0, 0.06, 10.15]}
				title="START"
				subtitle="intro"
				color="#f1c14b"
				markerPosition={[1.04, 0.04, 0.42]}
				markerRotationY={-0.04}
				boardScale={0.96}
			/>
			<BasePortal
				hoverKey="about"
				panelKey="about"
				position={[4.7, 0.06, 5.4]}
				title="ABOUT"
				subtitle="who I am"
				color="#7dbef3"
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
				markerPosition={[-1, 0.04, 0.26]}
				markerRotationY={0.06}
				boardScale={0.94}
			/>

			<MoundMarker />
			<ExperienceBoard />
			<ContactDugout />
		</group>
	);
}
