'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Toaster } from 'sonner';
import * as THREE from 'three';

import { StadiumScene } from '@/components/scene/StadiumScene';
import { StadiumContentPanel } from '@/components/ui/StadiumContentPanel';
import { StadiumGuideOverlay } from '@/components/ui/StadiumGuideOverlay';
import { StadiumLoadingScreen } from '@/components/ui/StadiumLoadingScreen';
import { defaultCamera } from '@/lib/stadium-data';

export default function StadiumExperience() {
	const [loading, setLoading] = useState(true);

	return (
		<div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#8fc3ea' }}>
			<Canvas
				shadows
				camera={{ position: defaultCamera.position, fov: 36, near: 0.1, far: 180 }}
				gl={{
					antialias: true,
					powerPreference: 'high-performance',
					alpha: false,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1,
				}}
				dpr={[1, 2]}
			>
				<Suspense fallback={null}>
					<StadiumScene />
				</Suspense>
			</Canvas>
			{loading ? <StadiumLoadingScreen onDone={() => setLoading(false)} /> : null}
			{!loading ? <StadiumGuideOverlay /> : null}
			{!loading ? <StadiumContentPanel /> : null}
			<Toaster theme="light" position="top-center" />
		</div>
	);
}
