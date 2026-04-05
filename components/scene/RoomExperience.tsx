'use client';

import * as React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';

import { Crosshair } from '@/components/scene/Crosshair';
import { FirstPerson } from '@/components/scene/FirstPerson';
import { ContentOverlay } from '@/components/ui/ContentOverlay';
import { HintOverlay } from '@/components/ui/HintOverlay';
import { IntroScreen } from '@/components/ui/IntroScreen';
import { MiniMap } from '@/components/ui/MiniMap';
import { type PortfolioObjectId } from '@/lib/immersive-room';
import { useStore } from '@/store/useStore';

type InteractiveObjectProps = {
	id: PortfolioObjectId;
	position: [number, number, number];
	rotation?: [number, number, number];
	pickupPosition?: [number, number, number];
	pickupRotation?: [number, number, number];
	children: React.ReactNode;
	floatOffset?: number;
};

function assignInteractiveUserData(root: THREE.Object3D, id: PortfolioObjectId) {
	root.traverse((child) => {
		child.userData.interactive = true;
		child.userData.panelKey = id;
	});
}

function InteractiveObject({
	id,
	position,
	rotation = [0, 0, 0],
	pickupPosition = [0, 1.95, 1.55],
	pickupRotation = [0, 0, 0],
	children,
	floatOffset = 0,
}: InteractiveObjectProps) {
	const ref = React.useRef<THREE.Group>(null);
	const { activePanel, hoveredObject, overlayVisible } = useStore();
	const basePosition = React.useMemo(() => new THREE.Vector3(...position), [position]);
	const baseRotation = React.useMemo(
		() => new THREE.Euler(rotation[0], rotation[1], rotation[2]),
		[rotation]
	);
	const pickupPos = React.useMemo(() => new THREE.Vector3(...pickupPosition), [pickupPosition]);
	const pickupRot = React.useMemo(
		() => new THREE.Euler(pickupRotation[0], pickupRotation[1], pickupRotation[2]),
		[pickupRotation]
	);

	React.useEffect(() => {
		if (ref.current) {
			assignInteractiveUserData(ref.current, id);
		}
	}, [id]);

	useFrame((state, delta) => {
		if (!ref.current) {
			return;
		}

		const isSelected = overlayVisible && activePanel === id;
		const isHovered = hoveredObject === id;
		const wobble = Math.sin(state.clock.elapsedTime * 1.15 + floatOffset) * (isSelected ? 0 : 0.04);
		const targetPosition = isSelected ? pickupPos : new THREE.Vector3(basePosition.x, basePosition.y + wobble, basePosition.z);
		const targetRotation = isSelected ? pickupRot : baseRotation;
		const targetScale = isSelected ? 1.16 : isHovered ? 1.04 : 1;
		const easing = 1 - Math.exp(-delta * (isSelected ? 10 : 8));

		ref.current.position.lerp(targetPosition, easing);
		ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotation.x, easing);
		ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotation.y, easing);
		ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRotation.z, easing);
		ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), easing);
	});

	return <group ref={ref} position={position} rotation={rotation}>{children}</group>;
}

function WallClock({ position }: { position: [number, number, number] }) {
	const hourRef = React.useRef<THREE.Mesh>(null);
	const minuteRef = React.useRef<THREE.Mesh>(null);

	useFrame(() => {
		const now = new Date();
		const minutes = now.getMinutes();
		const hours = now.getHours() % 12 + minutes / 60;

		if (minuteRef.current) {
			minuteRef.current.rotation.z = -(minutes / 60) * Math.PI * 2;
		}
		if (hourRef.current) {
			hourRef.current.rotation.z = -(hours / 12) * Math.PI * 2;
		}
	});

	return (
		<group position={position}>
			<mesh castShadow receiveShadow>
				<cylinderGeometry args={[0.24, 0.24, 0.04, 40]} />
				<meshStandardMaterial color="#f8fafc" roughness={0.75} />
			</mesh>
			<mesh position={[0, 0, 0.023]}>
				<ringGeometry args={[0.18, 0.2, 40]} />
				<meshBasicMaterial color="#1f2937" />
			</mesh>
			{Array.from({ length: 12 }).map((_, index) => {
				const angle = (index / 12) * Math.PI * 2;
				return (
					<mesh
						key={index}
						position={[Math.sin(angle) * 0.17, Math.cos(angle) * 0.17, 0.025]}
						rotation={[0, 0, -angle]}
					>
						<boxGeometry args={[0.012, 0.04, 0.01]} />
						<meshBasicMaterial color="#111827" />
					</mesh>
				);
			})}
			<mesh ref={hourRef} position={[0, 0.04, 0.03]}>
				<boxGeometry args={[0.03, 0.12, 0.012]} />
				<meshBasicMaterial color="#111827" />
			</mesh>
			<mesh ref={minuteRef} position={[0, 0.07, 0.032]}>
				<boxGeometry args={[0.02, 0.18, 0.01]} />
				<meshBasicMaterial color="#0f172a" />
			</mesh>
			<mesh position={[0, 0, 0.034]}>
				<sphereGeometry args={[0.014, 16, 16]} />
				<meshBasicMaterial color="#0f172a" />
			</mesh>
		</group>
	);
}

function Plant({ position }: { position: [number, number, number] }) {
	const swayRef = React.useRef<THREE.Group>(null);

	useFrame((state) => {
		if (swayRef.current) {
			swayRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
		}
	});

	return (
		<group position={position}>
			<mesh castShadow receiveShadow position={[0, 0.09, 0]}>
				<cylinderGeometry args={[0.16, 0.12, 0.18, 24]} />
				<meshStandardMaterial color="#8b4513" roughness={0.86} />
			</mesh>
			<group ref={swayRef} position={[0, 0.24, 0]}>
				{[
					[-0.1, 0.08, 0],
					[0.08, 0.12, -0.05],
					[0.02, 0.2, 0.08],
					[-0.08, 0.22, 0.04],
					[0.12, 0.26, 0],
					[0, 0.3, -0.08],
				].map((leaf, index) => (
					<mesh key={index} castShadow position={leaf as [number, number, number]}>
						<sphereGeometry args={[0.12, 18, 18]} />
						<meshStandardMaterial color="#1a5c1a" roughness={0.9} />
					</mesh>
				))}
			</group>
		</group>
	);
}

function CeilingLamp({ position }: { position: [number, number, number] }) {
	const bulbRef = React.useRef<THREE.MeshStandardMaterial>(null);
	const lightRef = React.useRef<THREE.PointLight>(null);

	useFrame((state) => {
		const rise = Math.min(state.clock.elapsedTime / 2, 1);
		const flicker = rise < 1 ? 0.85 + Math.sin(state.clock.elapsedTime * 18) * 0.08 : 1;
		if (lightRef.current) {
			lightRef.current.intensity = 1.2 * rise * flicker;
		}
		if (bulbRef.current) {
			bulbRef.current.emissiveIntensity = 1.5 * rise * flicker;
		}
	});

	return (
		<group position={position}>
			<mesh position={[0, 0.15, 0]}>
				<cylinderGeometry args={[0.005, 0.005, 0.3, 12]} />
				<meshStandardMaterial color="#cbd5e1" metalness={0.55} roughness={0.2} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0, 0]}>
				<cylinderGeometry args={[0.15, 0.15, 0.08, 28]} />
				<meshStandardMaterial color="#111827" roughness={0.45} />
			</mesh>
			<mesh position={[0, -0.05, 0]}>
				<sphereGeometry args={[0.08, 24, 24]} />
				<meshStandardMaterial ref={bulbRef} color="#ffd59a" emissive="#ffd59a" emissiveIntensity={0.2} />
			</mesh>
			<pointLight ref={lightRef} position={[0, -0.05, 0]} color="#ffd59a" distance={13} decay={2} intensity={0} />
		</group>
	);
}

function SecondMonitor({ position }: { position: [number, number, number] }) {
	const materialRef = React.useRef<THREE.MeshStandardMaterial>(null);

	useFrame((state) => {
		const wave = (Math.sin(state.clock.elapsedTime * 1.5) + 1) / 2;
		if (materialRef.current) {
			materialRef.current.emissive = new THREE.Color().lerpColors(
				new THREE.Color('#0b2541'),
				new THREE.Color('#123f66'),
				wave
			);
		}
	});

	return (
		<group position={position} rotation={[0, -0.26, 0]}>
			<mesh castShadow receiveShadow position={[0, 0.11, 0]}>
				<boxGeometry args={[0.38, 0.24, 0.03]} />
				<meshStandardMaterial color="#101827" roughness={0.4} />
			</mesh>
			<mesh position={[0, 0.11, 0.017]}>
				<planeGeometry args={[0.33, 0.19]} />
				<meshStandardMaterial ref={materialRef} color="#0b2541" emissive="#123f66" emissiveIntensity={0.6} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, -0.02, 0]}>
				<cylinderGeometry args={[0.015, 0.02, 0.12, 16]} />
				<meshStandardMaterial color="#374151" metalness={0.4} roughness={0.3} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, -0.09, 0]}>
				<boxGeometry args={[0.12, 0.02, 0.08]} />
				<meshStandardMaterial color="#1f2937" roughness={0.45} />
			</mesh>
		</group>
	);
}

function Keyboard({ position }: { position: [number, number, number] }) {
	return (
		<group position={position}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.42, 0.018, 0.15]} />
				<meshStandardMaterial color="#222222" roughness={0.6} />
			</mesh>
			{[-0.045, -0.015, 0.015, 0.045].map((z, index) => (
				<mesh key={index} position={[0, 0.012, z]}>
					<boxGeometry args={[0.34, 0.005, 0.016]} />
					<meshStandardMaterial color="#2f3742" roughness={0.8} />
				</mesh>
			))}
		</group>
	);
}

function SteamPlume() {
	const groupRef = React.useRef<THREE.Group>(null);

	useFrame((state) => {
		if (!groupRef.current) {
			return;
		}

		groupRef.current.children.forEach((child, index) => {
			const mesh = child as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
			const t = (state.clock.elapsedTime * 0.65 + index * 0.32) % 1;
			mesh.position.y = 0.35 + t * 0.42;
			mesh.position.x = Math.sin((state.clock.elapsedTime + index) * 1.6) * 0.04;
			mesh.material.opacity = Math.sin(t * Math.PI) * 0.28;
		});
	});

	return (
		<group ref={groupRef}>
			{[0, 1, 2].map((index) => (
				<mesh key={index} position={[0, 0.4, 0]} rotation={[0, 0, 0.15 * index]}>
					<planeGeometry args={[0.12, 0.24]} />
					<meshBasicMaterial color="#e2e8f0" transparent opacity={0.1} depthWrite={false} />
				</mesh>
			))}
		</group>
	);
}

function LaptopMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow position={[0, 0.05, 0]}>
				<boxGeometry args={[1.75, 0.08, 1.15]} />
				<meshStandardMaterial color="#202633" metalness={0.35} roughness={0.38} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, 0.65, -0.45]} rotation={[-0.95, 0, 0]}>
				<boxGeometry args={[1.62, 0.08, 1.05]} />
				<meshStandardMaterial color="#1a2130" metalness={0.35} roughness={0.32} />
			</mesh>
			<mesh position={[0, 0.67, -0.47]} rotation={[-0.95, 0, 0]}>
				<planeGeometry args={[1.46, 0.82]} />
				<meshStandardMaterial color="#0a2b47" emissive="#5bd4ff" emissiveIntensity={0.34} />
			</mesh>
		</group>
	);
}

function NotebookMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[1.3, 0.06, 0.95]} />
				<meshStandardMaterial color="#eef4fb" roughness={0.84} />
			</mesh>
			<mesh position={[-0.48, 0.03, 0]}>
				<boxGeometry args={[0.08, 0.07, 0.95]} />
				<meshStandardMaterial color="#eb7f6d" roughness={0.7} />
			</mesh>
			{Array.from({ length: 5 }).map((_, index) => (
				<mesh key={index} position={[0.08, 0.04, -0.32 + index * 0.16]}>
					<boxGeometry args={[0.95, 0.01, 0.01]} />
					<meshStandardMaterial color="#d5e2f0" />
				</mesh>
			))}
		</group>
	);
}

function StickyNotesMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow position={[-0.18, 0.03, 0]}>
				<boxGeometry args={[0.85, 0.07, 0.85]} />
				<meshStandardMaterial color="#ffe37d" roughness={0.76} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.15, 0.08, -0.12]} rotation={[0, 0, -0.16]}>
				<boxGeometry args={[0.8, 0.06, 0.8]} />
				<meshStandardMaterial color="#ffb891" roughness={0.76} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.38, 0.11, 0.15]} rotation={[0, 0, 0.1]}>
				<boxGeometry args={[0.76, 0.05, 0.76]} />
				<meshStandardMaterial color="#b8f7da" roughness={0.76} />
			</mesh>
		</group>
	);
}

function PhotoFrameMesh() {
	const texture = useLoader(THREE.TextureLoader, '/images/about.jpg');
	texture.colorSpace = THREE.SRGBColorSpace;

	return (
		<group>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.92, 1.05, 0.1]} />
				<meshStandardMaterial color="#5a4028" roughness={0.62} />
			</mesh>
			<mesh position={[0, 0, 0.055]}>
				<planeGeometry args={[0.67, 0.84]} />
				<meshStandardMaterial map={texture} roughness={0.92} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, -0.62, -0.18]} rotation={[-0.62, 0, 0]}>
				<boxGeometry args={[0.42, 0.06, 0.35]} />
				<meshStandardMaterial color="#4c341f" roughness={0.72} />
			</mesh>
		</group>
	);
}

function CoffeeMugMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow>
				<cylinderGeometry args={[0.34, 0.29, 0.52, 28]} />
				<meshStandardMaterial color="#d9e3ed" roughness={0.44} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.37, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
				<torusGeometry args={[0.15, 0.035, 16, 32, Math.PI]} />
				<meshStandardMaterial color="#d9e3ed" roughness={0.44} />
			</mesh>
			<mesh position={[0, 0.18, 0]}>
				<cylinderGeometry args={[0.27, 0.27, 0.12, 24]} />
				<meshStandardMaterial color="#5b3c2b" roughness={0.9} />
			</mesh>
			<SteamPlume />
		</group>
	);
}

function LampMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow position={[0, 0.1, 0]}>
				<cylinderGeometry args={[0.48, 0.55, 0.14, 24]} />
				<meshStandardMaterial color="#2b3442" metalness={0.42} roughness={0.42} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.1, 0.75, -0.02]} rotation={[0, 0, -0.42]}>
				<cylinderGeometry args={[0.07, 0.07, 1.25, 18]} />
				<meshStandardMaterial color="#c7d0de" metalness={0.52} roughness={0.28} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.52, 1.42, -0.25]} rotation={[0, 0, 0.44]}>
				<coneGeometry args={[0.42, 0.78, 24]} />
				<meshStandardMaterial color="#2e3644" metalness={0.42} roughness={0.34} />
			</mesh>
			<mesh position={[0.64, 1.25, -0.41]}>
				<sphereGeometry args={[0.12, 18, 18]} />
				<meshStandardMaterial color="#ffd59a" emissive="#ffd59a" emissiveIntensity={1.6} />
			</mesh>
		</group>
	);
}

function BusinessCardsMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow position={[0, 0, 0]}>
				<boxGeometry args={[0.95, 0.08, 0.55]} />
				<meshStandardMaterial color="#f4f8fd" roughness={0.7} />
			</mesh>
			<mesh castShadow receiveShadow position={[0.18, 0.08, -0.1]} rotation={[0, 0.12, 0]}>
				<boxGeometry args={[0.92, 0.08, 0.55]} />
				<meshStandardMaterial color="#dbe6f3" roughness={0.7} />
			</mesh>
			<mesh castShadow receiveShadow position={[-0.24, 0.12, 0.06]} rotation={[0, -0.1, 0]}>
				<boxGeometry args={[0.92, 0.08, 0.55]} />
				<meshStandardMaterial color="#ffffff" roughness={0.7} />
			</mesh>
		</group>
	);
}

function BookshelfMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.4, 2.2, 1.4]} />
				<meshStandardMaterial color="#3b4556" roughness={0.72} />
			</mesh>
			{[-0.55, 0.05, 0.55].map((z, index) => (
				<mesh key={index} castShadow receiveShadow position={[0, -0.55 + index * 0.72, z * 0]}>
					<boxGeometry args={[0.42, 0.04, 1.34]} />
					<meshStandardMaterial color="#4a5568" roughness={0.72} />
				</mesh>
			))}
			{Array.from({ length: 12 }).map((_, index) => {
				const row = index < 6 ? 0.42 : -0.3;
				const x = 0;
				const z = -0.48 + (index % 6) * 0.18;
				const height = 0.32 + ((index % 4) * 0.06);
				const colors = ['#fad46d', '#7df0c6', '#f2796c', '#95baff', '#ffe59a', '#d8e4f0'];
				return (
					<mesh key={index} castShadow receiveShadow position={[x, row, z]}>
						<boxGeometry args={[0.16, height, 0.1]} />
						<meshStandardMaterial color={colors[index % colors.length]} roughness={0.76} />
					</mesh>
				);
			})}
		</group>
	);
}

function TrophyMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow position={[0, 0.44, 0]}>
				<cylinderGeometry args={[0.28, 0.42, 0.78, 24]} />
				<meshStandardMaterial color="#d9ab39" metalness={0.7} roughness={0.24} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, -0.1, 0]}>
				<cylinderGeometry args={[0.18, 0.18, 0.36, 20]} />
				<meshStandardMaterial color="#d9ab39" metalness={0.7} roughness={0.24} />
			</mesh>
			<mesh castShadow receiveShadow position={[0, -0.34, 0]}>
				<boxGeometry args={[0.76, 0.24, 0.48]} />
				<meshStandardMaterial color="#4d3319" roughness={0.52} />
			</mesh>
		</group>
	);
}

function DiplomaMesh() {
	return (
		<group>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[1.2, 0.94, 0.08]} />
				<meshStandardMaterial color="#764f25" roughness={0.58} />
			</mesh>
			<mesh position={[0, 0, 0.05]}>
				<planeGeometry args={[0.88, 0.68]} />
				<meshStandardMaterial color="#efe1b2" roughness={0.92} />
			</mesh>
		</group>
	);
}

function Pinboard() {
	return (
		<group position={[-2.5, 1.6, -5.9]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.8, 0.6, 0.02]} />
				<meshStandardMaterial color="#a0785a" roughness={0.95} />
			</mesh>
			{[
				[-0.2, 0.1, '#fef3c7'],
				[0.1, 0.16, '#f8fafc'],
				[-0.08, -0.08, '#fde68a'],
				[0.22, -0.04, '#ffffff'],
			].map(([x, y, color], index) => (
				<mesh key={index} position={[Number(x), Number(y), 0.02]} rotation={[0, 0, index * 0.08]}>
					<planeGeometry args={[0.15, 0.12]} />
					<meshStandardMaterial color={String(color)} roughness={0.95} />
				</mesh>
			))}
		</group>
	);
}

function WasteBin() {
	return (
		<group position={[1.4, 0.12, 0.8]}>
			<mesh castShadow receiveShadow>
				<cylinderGeometry args={[0.14, 0.1, 0.22, 22, 1, true]} />
				<meshStandardMaterial color="#2d2d2d" roughness={0.85} side={THREE.DoubleSide} />
			</mesh>
			<mesh position={[0.01, 0.01, 0]}>
				<sphereGeometry args={[0.05, 12, 12]} />
				<meshStandardMaterial color="#d1d5db" roughness={1} />
			</mesh>
		</group>
	);
}

function RoomShell() {
	return (
		<>
			<color attach="background" args={['#020617']} />
			<fog attach="fog" args={['#020617', 9, 22]} />
			<ambientLight intensity={0.32} color="#6ba9ff" />
			<hemisphereLight intensity={0.55} groundColor="#1a120d" color="#6ca8ff" />
			<directionalLight
				castShadow
				intensity={1.05}
				position={[4.8, 7.5, 3.2]}
				color="#dbeafe"
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			<pointLight position={[-4.2, 3.5, -4.8]} intensity={16} distance={12} color="#2fd8ff" />
			<pointLight position={[2.8, 2.6, -2.2]} intensity={12} distance={8} color="#ffcf8a" />

			<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
				<planeGeometry args={[16, 16]} />
				<meshStandardMaterial color="#302114" roughness={0.92} metalness={0.02} />
			</mesh>
			{Array.from({ length: 15 }).map((_, index) => {
				const offset = -7 + index;
				return (
					<React.Fragment key={index}>
						<mesh position={[offset, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
							<planeGeometry args={[0.02, 14]} />
							<meshBasicMaterial color="#94a3b8" transparent opacity={0.08} />
						</mesh>
						<mesh position={[0, 0.003, offset]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
							<planeGeometry args={[0.02, 14]} />
							<meshBasicMaterial color="#94a3b8" transparent opacity={0.08} />
						</mesh>
					</React.Fragment>
				);
			})}

			<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
				<circleGeometry args={[3.5, 64]} />
				<meshStandardMaterial color="#0d2b2b" roughness={0.95} />
			</mesh>

			<mesh receiveShadow position={[0, 2, -6]}>
				<boxGeometry args={[14, 4, 0.2]} />
				<meshStandardMaterial color="#0f1c2f" roughness={0.96} />
			</mesh>
			<mesh receiveShadow position={[-7, 2, 0]}>
				<boxGeometry args={[0.2, 4, 14]} />
				<meshStandardMaterial color="#0c1625" roughness={0.96} />
			</mesh>
			<mesh receiveShadow position={[7, 2, 0]}>
				<boxGeometry args={[0.2, 4, 14]} />
				<meshStandardMaterial color="#0c1625" roughness={0.96} />
			</mesh>
			<mesh receiveShadow position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
				<planeGeometry args={[14, 14]} />
				<meshStandardMaterial color="#08111d" roughness={1} />
			</mesh>

			{[-6, 6].map((x) => (
				<mesh key={`skirt-x-${x}`} position={[x, 0.04, 0]}>
					<boxGeometry args={[0.06, 0.08, 14]} />
					<meshStandardMaterial color="#1b2a3d" roughness={0.95} />
				</mesh>
			))}
			<mesh position={[0, 0.04, -6]}>
				<boxGeometry args={[14, 0.08, 0.06]} />
				<meshStandardMaterial color="#1b2a3d" roughness={0.95} />
			</mesh>

			{[0.9, 1.8].map((y) => (
				<React.Fragment key={y}>
					<mesh position={[0, y, -5.93]}>
						<boxGeometry args={[13.8, 0.02, 0.02]} />
						<meshStandardMaterial color="#17283d" roughness={0.95} />
					</mesh>
					<mesh position={[-5.93, y, 0]}>
						<boxGeometry args={[0.02, 0.02, 13.8]} />
						<meshStandardMaterial color="#17283d" roughness={0.95} />
					</mesh>
					<mesh position={[5.93, y, 0]}>
						<boxGeometry args={[0.02, 0.02, 13.8]} />
						<meshStandardMaterial color="#17283d" roughness={0.95} />
					</mesh>
				</React.Fragment>
			))}

			<mesh position={[0, 1.8, -5.88]}>
				<planeGeometry args={[1.2, 0.8]} />
				<meshStandardMaterial color="#14283f" emissive="#091724" emissiveIntensity={0.12} />
			</mesh>
			<Pinboard />
			<WallClock position={[0, 2.4, -5.88]} />
			<Plant position={[1.8, 0, -3.8]} />
			<WasteBin />
			<CeilingLamp position={[0, 3.15, 0]} />

			<group position={[0, 0, -2]}>
				<mesh castShadow receiveShadow position={[0, 1.02, 0]}>
					<boxGeometry args={[3.1, 0.16, 1.7]} />
					<meshStandardMaterial color="#6d4727" roughness={0.64} metalness={0.08} />
				</mesh>
				{[
					[-1.35, 0.5, -0.68],
					[1.35, 0.5, -0.68],
					[-1.35, 0.5, 0.68],
					[1.35, 0.5, 0.68],
				].map((leg) => (
					<mesh key={leg.join('-')} castShadow receiveShadow position={leg as [number, number, number]}>
						<boxGeometry args={[0.14, 1, 0.14]} />
						<meshStandardMaterial color="#4b311b" roughness={0.78} />
					</mesh>
				))}
			</group>

			<group position={[0, 0, 1.5]}>
				<mesh castShadow receiveShadow position={[0, 0.82, 0]}>
					<cylinderGeometry args={[0.35, 0.35, 0.08, 24]} />
					<meshStandardMaterial color="#1a1a2e" roughness={0.55} />
				</mesh>
				<mesh castShadow receiveShadow position={[0, 1.18, -0.2]}>
					<boxGeometry args={[0.34, 0.5, 0.05]} />
					<meshStandardMaterial color="#1a1a2e" roughness={0.55} />
				</mesh>
				<mesh castShadow receiveShadow position={[0, 0.44, 0]}>
					<cylinderGeometry args={[0.04, 0.04, 0.76, 16]} />
					<meshStandardMaterial color="#3b4252" metalness={0.45} roughness={0.25} />
				</mesh>
				{Array.from({ length: 5 }).map((_, index) => {
					const angle = (index / 5) * Math.PI * 2;
					return (
						<group key={index} position={[0, 0.06, 0]} rotation={[0, -angle, 0]}>
							<mesh castShadow receiveShadow position={[0, 0, 0.3]}>
								<boxGeometry args={[0.05, 0.02, 0.45]} />
								<meshStandardMaterial color="#3b4252" metalness={0.45} roughness={0.25} />
							</mesh>
						</group>
					);
				})}
			</group>

			<SecondMonitor position={[0.7, 1.7, -3.25]} />
			<Keyboard position={[0.1, 1.08, -1.7]} />
			<ContactShadows position={[0, 0.01, 0]} opacity={0.42} scale={15} blur={2.4} far={6.5} />
		</>
	);
}

function SceneContent() {
	return (
		<>
			<FirstPerson />
			<RoomShell />

			<InteractiveObject
				id="projects"
				position={[0, 1.16, -2.28]}
				pickupPosition={[0, 1.9, 1.3]}
				pickupRotation={[-0.12, 0, 0]}
				floatOffset={0.2}
			>
				<LaptopMesh />
			</InteractiveObject>

			<InteractiveObject
				id="resume"
				position={[1.68, 1.08, -1.9]}
				rotation={[0, 0.18, -0.16]}
				pickupPosition={[0.65, 1.82, 1.35]}
				pickupRotation={[0.02, -0.12, -0.06]}
				floatOffset={0.8}
			>
				<NotebookMesh />
			</InteractiveObject>

			<InteractiveObject
				id="skills"
				position={[-1.35, 1.09, -1.95]}
				rotation={[0, -0.18, 0.08]}
				pickupPosition={[-0.62, 1.84, 1.42]}
				pickupRotation={[0.05, 0.12, -0.04]}
				floatOffset={1.4}
			>
				<StickyNotesMesh />
			</InteractiveObject>

			<InteractiveObject
				id="about"
				position={[-1.85, 1.28, -2.95]}
				rotation={[0.08, 0.32, 0]}
				pickupPosition={[-0.76, 1.95, 1.18]}
				pickupRotation={[0, 0.08, 0]}
				floatOffset={2.1}
			>
				<PhotoFrameMesh />
			</InteractiveObject>

			<InteractiveObject
				id="hobbies"
				position={[1.25, 1.14, -2.55]}
				pickupPosition={[0.7, 1.66, 1.42]}
				floatOffset={2.7}
			>
				<CoffeeMugMesh />
			</InteractiveObject>

			<InteractiveObject
				id="experience"
				position={[2.8, 1.04, -2.7]}
				rotation={[0, -0.3, 0]}
				pickupPosition={[0.88, 1.95, 1.05]}
				pickupRotation={[0.1, -0.25, -0.1]}
				floatOffset={3.1}
			>
				<LampMesh />
			</InteractiveObject>

			<InteractiveObject
				id="contact"
				position={[0.92, 1.08, -1.15]}
				rotation={[0, -0.16, 0]}
				pickupPosition={[0.15, 1.68, 1.36]}
				floatOffset={3.7}
			>
				<BusinessCardsMesh />
			</InteractiveObject>

			<InteractiveObject
				id="blog"
				position={[-5.5, 1.12, -2.5]}
				rotation={[0, 0.3, 0]}
				pickupPosition={[-1.05, 1.98, 1]}
				pickupRotation={[0.02, 0.28, 0]}
				floatOffset={4.3}
			>
				<BookshelfMesh />
			</InteractiveObject>

			<InteractiveObject
				id="awards"
				position={[5, 2.2, -4.3]}
				pickupPosition={[0.9, 1.95, 1.22]}
				floatOffset={5.2}
			>
				<TrophyMesh />
			</InteractiveObject>

			<InteractiveObject
				id="education"
				position={[3.55, 2.4, -5.92]}
				pickupPosition={[-0.7, 1.94, 1.12]}
				floatOffset={5.8}
			>
				<DiplomaMesh />
			</InteractiveObject>
		</>
	);
}

export function RoomExperience() {
	const { setActivePanel, setOverlayVisible, overlayVisible } = useStore();

	React.useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Escape' && overlayVisible) {
				setActivePanel(null);
				setOverlayVisible(false);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [overlayVisible, setActivePanel, setOverlayVisible]);

	return (
		<div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
			<Canvas
				style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
				camera={{ fov: 72, near: 0.05, far: 200, position: [0, 1.7, 3.8] }}
				shadows
				gl={{ antialias: true, alpha: false }}
				dpr={[1, 1.75]}
			>
				<React.Suspense fallback={null}>
					<SceneContent />
				</React.Suspense>
			</Canvas>

			<IntroScreen />
			<Crosshair />
			<HintOverlay />
			<MiniMap />
			<ContentOverlay />
		</div>
	);
}
