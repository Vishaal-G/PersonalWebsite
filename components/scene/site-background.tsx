'use client';

import { motion } from 'framer-motion';

const floatingShapes = [
	{
		className:
			'left-[6%] top-[12%] h-36 w-36 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),rgba(88,211,255,0.16)_38%,rgba(88,211,255,0)_72%)] shadow-[0_24px_60px_-28px_rgba(88,211,255,0.85)]',
		animate: {
			y: [-18, 14, -18],
			x: [0, 16, 0],
			rotateX: [0, 12, 0],
			rotateY: [0, -16, 0],
			rotateZ: [0, 8, 0],
		},
		duration: 13,
	},
	{
		className:
			'right-[8%] top-[18%] h-52 w-52 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.22),rgba(255,160,93,0.18)_34%,rgba(255,160,93,0)_72%)] shadow-[0_26px_70px_-30px_rgba(255,160,93,0.85)]',
		animate: {
			y: [16, -20, 16],
			x: [0, -14, 0],
			scale: [1, 1.06, 1],
			rotateZ: [0, -10, 0],
		},
		duration: 15,
	},
	{
		className:
			'bottom-[14%] left-[14%] h-40 w-40 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(144,169,255,0.24),rgba(10,18,30,0.12))] shadow-[0_24px_65px_-30px_rgba(144,169,255,0.7)]',
		animate: {
			y: [12, -12, 12],
			x: [0, 12, 0],
			rotateY: [0, 18, 0],
			rotateZ: [0, -6, 0],
		},
		duration: 12,
	},
	{
		className:
			'bottom-[18%] right-[18%] h-28 w-28 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(125,240,198,0.28),rgba(125,240,198,0)_68%)] shadow-[0_18px_50px_-20px_rgba(125,240,198,0.75)]',
		animate: {
			y: [-10, 10, -10],
			x: [0, -10, 0],
			scale: [1, 1.14, 1],
		},
		duration: 10,
	},
];

const sparkles = [
	{ left: '12%', top: '22%', delay: 0, duration: 5.2 },
	{ left: '22%', top: '70%', delay: 1.2, duration: 6.5 },
	{ left: '40%', top: '16%', delay: 0.6, duration: 5.8 },
	{ left: '56%', top: '64%', delay: 1.8, duration: 6.2 },
	{ left: '68%', top: '28%', delay: 0.3, duration: 5.6 },
	{ left: '82%', top: '56%', delay: 1.5, duration: 6.8 },
	{ left: '74%', top: '14%', delay: 0.9, duration: 5.4 },
	{ left: '30%', top: '46%', delay: 2.1, duration: 6.1 },
];

export function SiteBackground() {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden [perspective:1600px]">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(87,211,255,0.08),transparent_26%),radial-gradient(circle_at_20%_28%,rgba(255,160,93,0.08),transparent_18%),radial-gradient(circle_at_80%_18%,rgba(125,240,198,0.07),transparent_16%)]" />
			<div className="absolute inset-x-[-8%] bottom-[-24%] h-[62vh] rounded-[50%] border border-white/6 bg-[radial-gradient(circle_at_center,rgba(12,38,64,0.65),rgba(3,8,16,0))] [transform:rotateX(78deg)]" />
			<div className="absolute inset-x-[14%] bottom-[-30%] h-[48vh] rounded-[50%] border border-primary/10 bg-[radial-gradient(circle_at_center,rgba(88,211,255,0.12),rgba(3,8,16,0))] [transform:rotateX(78deg)]" />

			{floatingShapes.map((shape, index) => (
				<motion.div
					key={index}
					className={`absolute ${shape.className}`}
					animate={shape.animate}
					transition={{
						duration: shape.duration,
						repeat: Infinity,
						repeatType: 'mirror',
						ease: 'easeInOut',
					}}
					style={{ transformStyle: 'preserve-3d' }}
				/>
			))}

			{sparkles.map((sparkle, index) => (
				<motion.div
					key={index}
					className="absolute h-1.5 w-1.5 rounded-full bg-white/75 shadow-[0_0_18px_rgba(216,251,255,0.85)]"
					style={{ left: sparkle.left, top: sparkle.top }}
					animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.45, 0.8] }}
					transition={{
						duration: sparkle.duration,
						repeat: Infinity,
						delay: sparkle.delay,
						ease: 'easeInOut',
					}}
				/>
			))}
		</div>
	);
}
