'use client';

import { useEffect } from 'react';

import { useStore } from '@/store/useStore';

export function OrbitHint() {
	const { hintVisible, setHintVisible } = useStore();

	useEffect(() => {
		const hide = () => setHintVisible(false);
		const timer = setTimeout(hide, 4000);
		window.addEventListener('mousedown', hide, { once: true });
		return () => {
			clearTimeout(timer);
			window.removeEventListener('mousedown', hide);
		};
	}, [setHintVisible]);

	if (!hintVisible) {
		return null;
	}

	return (
		<div
			style={{
				position: 'absolute',
				bottom: 28,
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 20,
				pointerEvents: 'none',
				background: 'rgba(6,13,26,0.75)',
				border: '1px solid rgba(255,255,255,0.08)',
				borderRadius: 20,
				padding: '8px 20px',
				display: 'flex',
				alignItems: 'center',
				gap: 10,
				animation: 'hintFadeIn 0.5s ease forwards',
			}}
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M2 8 A6 6 0 0 1 14 8" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M14 8 A6 6 0 0 1 2 8" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
			</svg>
			<span style={{ color: '#94a3b8', fontSize: 12, letterSpacing: 0.5 }}>
				Drag to explore · Click objects to open
			</span>
			<style>{`@keyframes hintFadeIn { from { opacity: 0; transform: translateX(-50%) translateY(6px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }`}</style>
		</div>
	);
}
