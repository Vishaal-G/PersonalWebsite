'use client';

import { useEffect, useMemo, useState } from 'react';

const lines = [
	'> Initializing Portfolio ...',
	'[████████████████████] 100%',
	'> Loading assets ...   OK',
	'> Mounting scene ...   OK',
	'> Welcome, visitor.',
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
	const [visibleChars, setVisibleChars] = useState(0);
	const [lineIndex, setLineIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [fading, setFading] = useState(false);

	const activeLine = lines[lineIndex] ?? '';
	const typedLines = useMemo(() => {
		return lines.map((line, index) => {
			if (index < lineIndex) return line;
			if (index === lineIndex) return line.slice(0, visibleChars);
			return '';
		});
	}, [lineIndex, visibleChars]);

	useEffect(() => {
		const progressTimer = window.setInterval(() => {
			setProgress((value) => Math.min(100, value + 2));
		}, 50);

		return () => window.clearInterval(progressTimer);
	}, []);

	useEffect(() => {
		if (!activeLine) {
			return;
		}

		if (visibleChars < activeLine.length) {
			const timer = window.setTimeout(() => setVisibleChars((value) => value + 1), 40);
			return () => window.clearTimeout(timer);
		}

		if (lineIndex < lines.length - 1) {
			const timer = window.setTimeout(() => {
				setLineIndex((value) => value + 1);
				setVisibleChars(0);
			}, 220);
			return () => window.clearTimeout(timer);
		}

		const fadeTimer = window.setTimeout(() => setFading(true), 400);
		const doneTimer = window.setTimeout(() => onDone(), 1100);
		return () => {
			window.clearTimeout(fadeTimer);
			window.clearTimeout(doneTimer);
		};
	}, [activeLine, lineIndex, onDone, visibleChars]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				zIndex: 60,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#050A18',
				opacity: fading ? 0 : 1,
				transition: 'opacity 0.7s ease',
			}}
		>
			<div
				style={{
					width: 'min(32rem, calc(100vw - 2rem))',
					borderRadius: 20,
					border: '1px solid rgba(148,163,184,0.16)',
					background: 'rgba(5,10,24,0.86)',
					padding: '1.5rem',
					boxShadow: '0 30px 100px -40px rgba(0,0,0,0.95)',
					backdropFilter: 'blur(12px)',
					fontFamily: 'JetBrains Mono, Consolas, monospace',
				}}
			>
				<div style={{ display: 'grid', gap: 8, minHeight: 156 }}>
					{typedLines.map((line, index) => (
						<div key={`${index}-${line}`} style={{ color: index === 1 ? '#7dd3fc' : '#cbd5e1', fontSize: 14, letterSpacing: 0.2 }}>
							{line}
							{index === lineIndex && !fading ? (
								<span style={{ color: '#38bdf8', marginLeft: 2, animation: 'blink 1s steps(2, start) infinite' }}>_</span>
							) : null}
						</div>
					))}
				</div>
				<div style={{ marginTop: 18, height: 8, overflow: 'hidden', borderRadius: 999, background: 'rgba(148,163,184,0.14)' }}>
					<div
						style={{
							width: `${progress}%`,
							height: '100%',
							borderRadius: 999,
							background: 'linear-gradient(90deg, #38bdf8, #2dd4bf)',
							transition: 'width 0.05s linear',
						}}
					/>
				</div>
				<style>{`@keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`}</style>
			</div>
		</div>
	);
}
