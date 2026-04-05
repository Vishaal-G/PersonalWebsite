'use client';

import { useEffect } from 'react';

import { useStore } from '@/store/useStore';

export function NameOverlay() {
	const { introVisible, setIntroVisible } = useStore();

	useEffect(() => {
		const timer = setTimeout(() => setIntroVisible(false), 3200);
		return () => clearTimeout(timer);
	}, [setIntroVisible]);

	if (!introVisible) {
		return null;
	}

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				zIndex: 50,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				animation: 'nameIn 0.8s ease forwards, nameOut 0.7s ease 2.5s forwards',
			}}
		>
			<p
				style={{
					color: '#6b7280',
					fontSize: 10,
					letterSpacing: 6,
					textTransform: 'uppercase',
					marginBottom: 14,
					fontFamily: 'monospace',
				}}
			>
				Portfolio
			</p>
			<h1 style={{ color: '#fff', fontSize: 44, fontWeight: 800, margin: '0 0 10px', letterSpacing: -1, textAlign: 'center' }}>
				Vishaal Gopalan
			</h1>
			<p
				style={{
					color: '#374151',
					fontSize: 13,
					letterSpacing: 2,
					textTransform: 'uppercase',
					fontFamily: 'monospace',
				}}
			>
				Engineer · Builder · Creator
			</p>
			<style>{`
				@keyframes nameIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
				@keyframes nameOut { from { opacity: 1 } to { opacity: 0; transform: translateY(-8px) } }
			`}</style>
		</div>
	);
}
