'use client';

import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

import { CameraRig } from '@/components/scene/CameraRig';
import { DeskMesh } from '@/components/scene/DeskMesh';
import { DustParticles } from '@/components/scene/DustParticles';
import { RoomEnvironment } from '@/components/scene/Environment';
import { InteractionManager } from '@/components/scene/InteractionManager';
import { Lighting } from '@/components/scene/Lighting';
import { Bookshelf } from '@/components/scene/objects/Bookshelf';
import { BusinessCards } from '@/components/scene/objects/BusinessCards';
import { CoffeeMug } from '@/components/scene/objects/CoffeeMug';
import { DeskLamp } from '@/components/scene/objects/DeskLamp';
import { DiplomaFrame } from '@/components/scene/objects/DiplomaFrame';
import { GithubPoster } from '@/components/scene/objects/GithubPoster';
import { Keyboard } from '@/components/scene/objects/Keyboard';
import { Laptop } from '@/components/scene/objects/Laptop';
import { LinkedInPoster } from '@/components/scene/objects/LinkedInPoster';
import { Monitor } from '@/components/scene/objects/Monitor';
import { Mouse } from '@/components/scene/objects/Mouse';
import { Nameplate } from '@/components/scene/objects/Nameplate';
import { Notebook } from '@/components/scene/objects/Notebook';
import { PenCup } from '@/components/scene/objects/PenCup';
import { Plant } from '@/components/scene/objects/Plant';
import { PhotoFrame } from '@/components/scene/objects/PhotoFrame';
import { ResumeFile } from '@/components/scene/objects/ResumeFile';
import { StickyNotes } from '@/components/scene/objects/StickyNotes';
import { Trophy } from '@/components/scene/objects/Trophy';

export function DeskScene() {
	return (
		<>
			<color attach="background" args={['#030810']} />
			<fog attach="fog" args={['#030810', 9, 25]} />

			<Lighting />
			<RoomEnvironment />
			<CameraRig />
			<InteractionManager />
			<DustParticles />

			<DeskMesh />
			<Nameplate />
			<DeskLamp />
			<PenCup />
			<Monitor />
			<Keyboard />
			<Mouse />
			<Plant />
			<LinkedInPoster />
			<GithubPoster />
			<ResumeFile />

			<Laptop />
			<Notebook />
			<StickyNotes />
			<PhotoFrame />
			<CoffeeMug />
			<DiplomaFrame />
			<BusinessCards />
			<Trophy />
			<Bookshelf />

			<EffectComposer>
				<Bloom intensity={0.4} luminanceThreshold={0.75} luminanceSmoothing={0.05} mipmapBlur />
				<Vignette darkness={0.55} offset={0.3} />
			</EffectComposer>
		</>
	);
}
