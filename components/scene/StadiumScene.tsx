'use client';

import { PitchGame } from '@/components/scene/PitchGame';
import { StadiumCameraRig } from '@/components/scene/StadiumCameraRig';
import { StadiumField } from '@/components/scene/StadiumField';
import { StadiumInteraction } from '@/components/scene/StadiumInteraction';
import { StadiumLights } from '@/components/scene/StadiumLights';
import { StadiumSky } from '@/components/scene/StadiumSky';
import { StadiumZones } from '@/components/scene/StadiumZones';
import { useStore } from '@/store/useStore';

export function StadiumScene() {
	const miniGameOpen = useStore((state) => state.miniGameOpen);

	return (
		<>
			<color attach="background" args={['#8fc3ea']} />
			<fog attach="fog" args={['#cfe5f6', 72, 132]} />
			<StadiumLights />
			<StadiumSky />
			<StadiumCameraRig />
			<StadiumInteraction />
			<StadiumField />
			<StadiumZones />
			{miniGameOpen ? <PitchGame /> : null}
		</>
	);
}
