'use client';

import { useMemo } from 'react';

import { InteractiveObject } from '@/components/scene/objects/InteractiveObject';
import { useHoverGlow } from '@/hooks/useHoverGlow';
import { makeNotebookTexture } from '@/lib/textures';

export function Notebook() {
	const coverMatRef = useHoverGlow('resume');
	const notebookTexture = useMemo(() => makeNotebookTexture(), []);

	return (
		<InteractiveObject panelKey="resume" position={[0.9, 0.81, 0.08]} rotation={[0, 0.18, 0.1]}>
			<mesh castShadow receiveShadow>
				<boxGeometry args={[0.55, 0.05, 0.78]} />
				<meshStandardMaterial ref={coverMatRef} map={notebookTexture} color="#5d3320" roughness={0.88} emissive="#06B6D4" emissiveIntensity={0} />
			</mesh>
			<mesh position={[-0.24, 0.005, 0]} castShadow>
				<boxGeometry args={[0.05, 0.06, 0.78]} />
				<meshStandardMaterial color="#96473f" roughness={0.8} />
			</mesh>
			<mesh position={[0.03, 0.028, 0]}>
				<planeGeometry args={[0.42, 0.66]} />
				<meshStandardMaterial color="#f5f2ea" roughness={1} />
			</mesh>
		</InteractiveObject>
	);
}
