'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';

import { HIT_HALF_WINDOW, PITCH_DURATION } from '@/lib/pitch-config';
import { getNextPanel } from '@/lib/stadium-data';
import { playHitSound, playMissSound } from '@/lib/sfx';
import { useStore } from '@/store/useStore';

const RELEASE = new THREE.Vector3(0, 1.6, 4.6);
const PLATE = new THREE.Vector3(0, 0.95, 9.6);
const UP = new THREE.Vector3(0, 1, 0);
const GRAVITY = 9;
const RESET_DELAY = 950;
const ADVANCE_DELAY = 950;
const HIT_FLIGHT_DURATION = ADVANCE_DELAY / 1000;
const HIT_FLIGHT_GRAVITY = 5.5;

type Phase = 'ready' | 'pitching' | 'settling';

export function PitchGame() {
	const { gl, clock } = useThree();
	const activePanel = useStore((state) => state.activePanel);
	const setActivePanel = useStore((state) => state.setActivePanel);
	const markPanelVisited = useStore((state) => state.markPanelVisited);
	const setPanelOpen = useStore((state) => state.setPanelOpen);
	const setMiniGameOpen = useStore((state) => state.setMiniGameOpen);
	const setSwingFeedback = useStore((state) => state.setSwingFeedback);
	const swingSignal = useStore((state) => state.swingSignal);
	const setPitchStartedAt = useStore((state) => state.setPitchStartedAt);

	const ballRef = useRef<THREE.Mesh>(null);
	const phaseRef = useRef<Phase>('ready');
	const pitchStartRef = useRef(0);
	const resolvedRef = useRef(false);
	const clockRef = useRef(0);
	const velocityRef = useRef(new THREE.Vector3());
	const lastSignalRef = useRef(swingSignal);
	const pendingTimeoutRef = useRef<number | null>(null);
	const hitFlightActiveRef = useRef(false);
	const hitFlightStartRef = useRef(0);
	const hitVelocityRef = useRef(new THREE.Vector3());

	useEffect(
		() => () => {
			if (pendingTimeoutRef.current !== null) window.clearTimeout(pendingTimeoutRef.current);
		},
		[]
	);

	const startPitch = useCallback(
		(elapsed: number) => {
			phaseRef.current = 'pitching';
			resolvedRef.current = false;
			pitchStartRef.current = elapsed;
			hitFlightActiveRef.current = false;
			setSwingFeedback(null);
			setPitchStartedAt(Date.now());
			if (ballRef.current) ballRef.current.visible = true;
			velocityRef.current
				.subVectors(PLATE, RELEASE)
				.divideScalar(PITCH_DURATION)
				.addScaledVector(UP, 0.5 * GRAVITY * PITCH_DURATION);
		},
		[setSwingFeedback, setPitchStartedAt]
	);

	const scheduleMiss = useCallback(
		(feedback: 'early' | 'late' | 'no-swing') => {
			resolvedRef.current = true;
			phaseRef.current = 'settling';
			setSwingFeedback(feedback);
			playMissSound();
			pendingTimeoutRef.current = window.setTimeout(() => {
				setSwingFeedback(null);
				startPitch(clockRef.current);
			}, RESET_DELAY);
		},
		[setSwingFeedback, startPitch]
	);

	const launchHitFlight = useCallback(() => {
		const target = new THREE.Vector3((Math.random() - 0.5) * 8, 6.5 + Math.random() * 2, -22 - Math.random() * 10);
		hitVelocityRef.current
			.subVectors(target, PLATE)
			.divideScalar(HIT_FLIGHT_DURATION)
			.addScaledVector(UP, 0.5 * HIT_FLIGHT_GRAVITY * HIT_FLIGHT_DURATION);
		hitFlightStartRef.current = clockRef.current;
		hitFlightActiveRef.current = true;
	}, []);

	const attemptSwing = useCallback(() => {
		if (phaseRef.current !== 'pitching' || resolvedRef.current) return;
		const t = (clockRef.current - pitchStartRef.current) / PITCH_DURATION;

		if (t < 1 - HIT_HALF_WINDOW) {
			scheduleMiss('early');
			return;
		}

		if (t > 1 + HIT_HALF_WINDOW) {
			scheduleMiss('late');
			return;
		}

		resolvedRef.current = true;
		phaseRef.current = 'settling';
		setSwingFeedback('hit');
		playHitSound();
		launchHitFlight();

		const next = getNextPanel(activePanel);
		if (next) {
			setActivePanel(next);
			markPanelVisited(next);
			pendingTimeoutRef.current = window.setTimeout(() => {
				setPanelOpen(true);
				setMiniGameOpen(false);
			}, ADVANCE_DELAY);
		} else {
			pendingTimeoutRef.current = window.setTimeout(() => {
				setSwingFeedback(null);
				startPitch(clockRef.current);
			}, ADVANCE_DELAY);
		}
	}, [activePanel, launchHitFlight, markPanelVisited, scheduleMiss, setActivePanel, setMiniGameOpen, setPanelOpen, setSwingFeedback, startPitch]);

	useEffect(() => {
		clockRef.current = clock.getElapsedTime();
		startPitch(clockRef.current);
	}, [startPitch, clock]);

	useEffect(() => {
		if (swingSignal !== lastSignalRef.current) {
			lastSignalRef.current = swingSignal;
			attemptSwing();
		}
	}, [swingSignal, attemptSwing]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				event.preventDefault();
				attemptSwing();
			}
		};
		const onPointerDown = () => attemptSwing();

		window.addEventListener('keydown', onKeyDown);
		gl.domElement.addEventListener('pointerdown', onPointerDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			gl.domElement.removeEventListener('pointerdown', onPointerDown);
		};
	}, [gl, attemptSwing]);

	useFrame(({ clock }) => {
		clockRef.current = clock.elapsedTime;
		if (!ballRef.current) return;

		if (phaseRef.current === 'pitching') {
			const t = clock.elapsedTime - pitchStartRef.current;
			const normalizedT = t / PITCH_DURATION;

			if (!resolvedRef.current && normalizedT > 1 + HIT_HALF_WINDOW * 2.5) {
				scheduleMiss('no-swing');
				return;
			}

			const position = new THREE.Vector3()
				.copy(RELEASE)
				.addScaledVector(velocityRef.current, t)
				.addScaledVector(UP, -0.5 * GRAVITY * t * t);
			ballRef.current.position.copy(position);
			ballRef.current.rotation.x += 0.35;
			return;
		}

		if (hitFlightActiveRef.current) {
			const t = clock.elapsedTime - hitFlightStartRef.current;
			if (t > HIT_FLIGHT_DURATION) {
				hitFlightActiveRef.current = false;
				ballRef.current.visible = false;
				return;
			}
			const position = new THREE.Vector3()
				.copy(PLATE)
				.addScaledVector(hitVelocityRef.current, t)
				.addScaledVector(UP, -0.5 * HIT_FLIGHT_GRAVITY * t * t);
			ballRef.current.position.copy(position);
			ballRef.current.rotation.x += 0.5;
			ballRef.current.rotation.y += 0.3;
		}
	});

	return (
		<mesh ref={ballRef} position={RELEASE} castShadow>
			<sphereGeometry args={[0.14, 16, 16]} />
			<meshStandardMaterial color="#f7f2e6" roughness={0.5} />
		</mesh>
	);
}
