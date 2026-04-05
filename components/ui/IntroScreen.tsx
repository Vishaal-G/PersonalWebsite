'use client';

import { useState } from 'react';

import { useStore } from '@/store/useStore';

export function IntroScreen() {
	const { hasEntered, setHasEntered } = useStore();
	const [fading, setFading] = useState(false);
	const [show, setShow] = useState(true);

	const handleEnter = () => {
		setFading(true);
		window.setTimeout(() => {
			setHasEntered(true);
			setShow(false);
			const canvas = document.querySelector('canvas');
			canvas?.focus();
		}, 600);
	};

	if (!show || hasEntered) {
		return null;
	}

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				zIndex: 100,
				background: 'rgba(6, 13, 26, 0.88)',
				backdropFilter: 'blur(2px)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				opacity: fading ? 0 : 1,
				transition: 'opacity 0.6s ease',
				pointerEvents: fading ? 'none' : 'auto',
				padding: '24px',
			}}
		>
			<p
				style={{
					color: '#06B6D4',
					fontSize: 11,
					letterSpacing: 4,
					textTransform: 'uppercase',
					marginBottom: 16,
					fontFamily: 'monospace',
					textAlign: 'center',
				}}
			>
				Vishaal Gopalan
			</p>
			<h1
				style={{
					color: '#ffffff',
					fontSize: 'clamp(32px, 6vw, 42px)',
					fontWeight: 800,
					textAlign: 'center',
					maxWidth: 520,
					lineHeight: 1.15,
					marginBottom: 16,
					letterSpacing: -1,
				}}
			>
				A workspace,
				<br />
				not a webpage.
			</h1>
			<p
				style={{
					color: '#64748B',
					fontSize: 15,
					textAlign: 'center',
					maxWidth: 380,
					lineHeight: 1.6,
					marginBottom: 48,
				}}
			>
				Walk around the desk. Click objects to explore
				projects, resume, skills, and more.
			</p>
			<button
				onClick={handleEnter}
				style={{
					background: 'transparent',
					border: '1px solid #06B6D4',
					color: '#06B6D4',
					padding: '14px 40px',
					borderRadius: 8,
					fontSize: 15,
					cursor: 'pointer',
					letterSpacing: 1,
					transition: 'all 0.2s',
				}}
				onMouseEnter={(event) => {
					event.currentTarget.style.background = '#06B6D4';
					event.currentTarget.style.color = '#000';
				}}
				onMouseLeave={(event) => {
					event.currentTarget.style.background = 'transparent';
					event.currentTarget.style.color = '#06B6D4';
				}}
			>
				Enter the room
			</button>
			<p style={{ color: '#1e3a5f', fontSize: 11, marginTop: 24 }}>
				Best on desktop Chrome or Firefox
			</p>
		</div>
	);
}
