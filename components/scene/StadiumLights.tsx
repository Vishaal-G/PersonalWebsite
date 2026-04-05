'use client';

export function StadiumLights() {
	return (
		<>
			<ambientLight color="#fff7ea" intensity={0.24} />
			<hemisphereLight args={['#9bcff3', '#5a7e4f', 0.72]} />
			<directionalLight
				position={[-18, 24, 14]}
				intensity={2.45}
				color="#fff3da"
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-near={1}
				shadow-camera-far={80}
				shadow-camera-left={-30}
				shadow-camera-right={30}
				shadow-camera-top={30}
				shadow-camera-bottom={-30}
				shadow-bias={-0.00015}
			/>
			<pointLight position={[0, 8, -22]} intensity={0.28} distance={14} color="#d7e9ff" />
		</>
	);
}
