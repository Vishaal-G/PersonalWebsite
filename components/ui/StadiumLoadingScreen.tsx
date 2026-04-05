'use client';

import { useEffect, useMemo, useState } from 'react';

const lines = [
	'WELCOME TO VISHAAL FIELD',
	'POWERING SYSTEMS ...',
	'[████████████████████] 100%',
	"TODAY'S LINEUP: PROJECTS  SKILLS  EDUCATION",
	'PLAY BALL!',
];

export function StadiumLoadingScreen({ onDone }: { onDone: () => void }) {
	const [lineIndex, setLineIndex] = useState(0);
	const [visibleChars, setVisibleChars] = useState(0);
	const [progress, setProgress] = useState(0);
	const [flash, setFlash] = useState(false);
	const [fade, setFade] = useState(false);

	const typedLines = useMemo(
		() =>
			lines.map((line, index) => {
				if (index < lineIndex) return line;
				if (index === lineIndex) return line.slice(0, visibleChars);
				return '';
			}),
		[lineIndex, visibleChars]
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((value) => Math.min(100, value + 2));
		}, 50);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const activeLine = lines[lineIndex];
		if (!activeLine) return;

		if (visibleChars < activeLine.length) {
			const timer = setTimeout(() => setVisibleChars((value) => value + 1), 35);
			return () => clearTimeout(timer);
		}

		if (lineIndex < lines.length - 1) {
			const timer = setTimeout(() => {
				setLineIndex((value) => value + 1);
				setVisibleChars(0);
			}, 200);
			return () => clearTimeout(timer);
		}

		const flashTimer = setTimeout(() => setFlash(true), 200);
		const fadeTimer = setTimeout(() => setFade(true), 420);
		const doneTimer = setTimeout(() => onDone(), 980);
		return () => {
			clearTimeout(flashTimer);
			clearTimeout(fadeTimer);
			clearTimeout(doneTimer);
		};
	}, [lineIndex, onDone, visibleChars]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				zIndex: 50,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: flash ? '#ffffff' : '#000000',
				opacity: fade ? 0 : 1,
				transition: 'opacity 0.5s ease, background 0.2s ease',
			}}
		>
			<div
				style={{
					width: 'min(56rem, calc(100vw - 2rem))',
					border: '6px solid #2b2b2b',
					borderRadius: 24,
					padding: '1.6rem',
					background: '#050505',
					boxShadow: '0 40px 120px -45px rgba(0,0,0,0.95)',
				}}
			>
				<div
					style={{
						display: 'grid',
						gap: 12,
						minHeight: 216,
						padding: '1rem',
						background: '#0d0d0d',
						border: '4px solid #232323',
						borderRadius: 12,
						fontFamily: 'JetBrains Mono, Courier New, monospace',
					}}
				>
					{typedLines.map((line, index) => (
						<div key={`${index}-${line}`} style={{ color: index === 4 ? '#f9a825' : '#8bc34a', fontSize: index === 0 ? 22 : 18, fontWeight: 700, letterSpacing: 1.1 }}>
							{line}
							{index === lineIndex && !fade ? <span style={{ marginLeft: 4, animation: 'stadiumBlink 1s steps(2, start) infinite' }}>_</span> : null}
						</div>
					))}
				</div>
				<div style={{ marginTop: 18, height: 10, borderRadius: 999, overflow: 'hidden', background: '#222' }}>
					<div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #8bc34a, #f9a825)', transition: 'width 0.05s linear' }} />
				</div>
				<style>{`@keyframes stadiumBlink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`}</style>
			</div>
		</div>
	);
}
