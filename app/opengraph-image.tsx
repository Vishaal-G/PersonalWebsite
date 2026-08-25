import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Vishaal Gopalan — a baseball stadium portfolio you can explore";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#0f2a1a',
					backgroundImage: 'linear-gradient(135deg, #123a24 0%, #0a2015 100%)',
					fontFamily: 'sans-serif',
					position: 'relative',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							width: 760,
							height: 760,
							borderRadius: '50%',
							border: '3px solid rgba(241,193,75,0.18)',
						}}
					/>
				</div>
				<div style={{ display: 'flex', fontSize: 64 }}>⚾</div>
				<div
					style={{
						display: 'flex',
						marginTop: 28,
						fontSize: 72,
						fontWeight: 700,
						color: '#f9fbf5',
						letterSpacing: -2,
					}}
				>
					Vishaal Gopalan
				</div>
				<div
					style={{
						display: 'flex',
						marginTop: 18,
						fontSize: 32,
						color: '#c7e6cf',
						textAlign: 'center',
						padding: '0 80px',
					}}
				>
					A baseball-stadium portfolio you can explore
				</div>
				<div
					style={{
						display: 'flex',
						marginTop: 34,
						fontSize: 22,
						fontWeight: 600,
						letterSpacing: 4,
						color: '#f1c14b',
						textTransform: 'uppercase',
					}}
				>
					Computer Engineering · AI · Backend
				</div>
			</div>
		),
		{ ...size }
	);
}
