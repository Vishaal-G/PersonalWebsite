'use client';

import { StadiumCameraRig } from '@/components/scene/StadiumCameraRig';
import { StadiumField } from '@/components/scene/StadiumField';
import { StadiumInteraction } from '@/components/scene/StadiumInteraction';
import { StadiumLights } from '@/components/scene/StadiumLights';
import { StadiumSky } from '@/components/scene/StadiumSky';
import { StadiumZones } from '@/components/scene/StadiumZones';

export function StadiumScene() {
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
		</>
	);
}
