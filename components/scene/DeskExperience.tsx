'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Toaster } from 'sonner';

import { DeskScene } from '@/components/scene/DeskScene';
import { ContentPanel } from '@/components/ui/ContentPanel';
import { HoverLabel } from '@/components/ui/HoverLabel';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { NameOverlay } from '@/components/ui/NameOverlay';
import { OrbitHint } from '@/components/ui/OrbitHint';

export default function DeskExperience() {
	const [loading, setLoading] = useState(true);

	return (
		<div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#030810' }}>
			<Canvas
				style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
				camera={{ position: [0, 2.6, 5.2], fov: 50, near: 0.1, far: 80 }}
				shadows="soft"
				gl={{
					antialias: true,
					powerPreference: 'high-performance',
					shadowMapType: THREE.PCFSoftShadowMap,
					alpha: false,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1.1,
				}}
				dpr={[1, 2]}
			>
				<Suspense fallback={null}>
					<DeskScene />
				</Suspense>
			</Canvas>
			{loading ? <LoadingScreen onDone={() => setLoading(false)} /> : null}
			{!loading ? <NameOverlay /> : null}
			{!loading ? <OrbitHint /> : null}
			{!loading ? <HoverLabel /> : null}
			<ContentPanel />
			<Toaster theme="dark" position="top-center" />
		</div>
	);
}
