'use client';

import { useEffect, useState } from 'react';

import { useStore } from '@/store/useStore';

const LABELS: Record<string, string> = {
	projects: 'Laptop — Projects',
	resume: 'Notebook — Resume',
	skills: 'Sticky Notes — Skills',
	about: 'Photo Frame — About',
	hobbies: 'Coffee Mug — Hobbies',
	education: 'Diploma — Education',
	contact: 'Business Cards — Contact',
	achievements: 'Trophy — Achievements',
	blog: 'Bookshelf — Blog',
	linkedin: 'LinkedIn Poster — Open profile',
	github: 'GitHub Poster — Open repo',
	'resume-file': 'Resume File — Download PDF',
};

export function HoverLabel() {
	const hoveredKey = useStore((state) => state.hoveredKey);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
		window.addEventListener('mousemove', handleMove);
		return () => window.removeEventListener('mousemove', handleMove);
	}, []);

	if (!hoveredKey) {
		return null;
	}

	return (
		<div
			style={{
				position: 'absolute',
				left: position.x + 18,
				top: position.y - 38,
				zIndex: 30,
				background: 'rgba(6,13,26,0.92)',
				border: '1px solid rgba(6,182,212,0.35)',
				borderRadius: 6,
				padding: '5px 11px',
				color: '#06B6D4',
				fontSize: 12,
				fontFamily: 'monospace',
				letterSpacing: 0.4,
				pointerEvents: 'none',
				whiteSpace: 'nowrap',
			}}
		>
			{LABELS[hoveredKey] ?? hoveredKey}
		</div>
	);
}
