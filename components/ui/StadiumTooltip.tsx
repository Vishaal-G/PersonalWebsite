'use client';

import { useEffect, useState } from 'react';

import { getPanelMeta, stadiumActions } from '@/lib/stadium-data';
import { useStore } from '@/store/useStore';

export function StadiumTooltip() {
	const hoveredKey = useStore((state) => state.hoveredKey);
	const panelOpen = useStore((state) => state.panelOpen);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
		window.addEventListener('pointermove', handleMove);
		return () => window.removeEventListener('pointermove', handleMove);
	}, []);

	if (!hoveredKey || panelOpen) return null;
	const panelMeta = getPanelMeta(hoveredKey);
	const actionMeta = stadiumActions[hoveredKey as keyof typeof stadiumActions];
	const label = panelMeta?.label ?? actionMeta?.label ?? hoveredKey;
	const subtitle = panelMeta?.subtitle ?? actionMeta?.subtitle ?? '';

	return (
		<div
			style={{
				position: 'absolute',
				left: position.x + 16,
				top: position.y - 32,
				zIndex: 30,
				borderRadius: 999,
				background: 'rgba(255,255,255,0.96)',
				padding: '0.55rem 0.9rem',
				boxShadow: '0 18px 48px -22px rgba(0,0,0,0.35)',
				pointerEvents: 'none',
				whiteSpace: 'nowrap',
			}}
		>
			<div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: '#1b5e20' }}>{label}</div>
			{subtitle ? <div style={{ marginTop: 2, fontSize: 12, color: '#4b6350' }}>{subtitle}</div> : null}
		</div>
	);
}
