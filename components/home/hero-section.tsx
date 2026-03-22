'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer } from '@/lib/motion';

export function HeroSection() {
	return (
		<section className="relative overflow-hidden pb-6">
			<div className="container relative z-10 px-4">
				<div className="hero-stage">
					<div className="hero-echo hero-echo-one" />
					<div className="hero-echo hero-echo-two" />
					<motion.div
						className="hero-panel flex min-h-[78vh] items-center justify-center"
						initial={{ opacity: 0, y: 30, rotateX: 8 }}
						animate={{ opacity: 1, y: 0, rotateX: 0 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<div className="hero-orb" />
						<motion.div
							variants={staggerContainer()}
							initial="hidden"
							animate="show"
							className="relative z-10 mx-auto max-w-3xl text-center"
						>
							<motion.h2
								variants={fadeIn('up', 0.2)}
								className="mb-4 text-3xl font-bold text-primary md:text-4xl"
							>
								Computer Engineering
							</motion.h2>

							<motion.h1
								variants={fadeIn('up', 0.3)}
								className="text-5xl font-bold tracking-[-0.06em] md:text-6xl lg:text-7xl"
							>
								<span className="text-gradient">Vishaal Gopalan&apos;s</span> Portfolio
							</motion.h1>

							<motion.p
								variants={fadeIn('up', 0.5)}
								className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl"
							>
								A showcase of my projects, skills, and achievements in the field of engineering.
							</motion.p>

							<motion.div
								variants={fadeIn('up', 0.7)}
								className="mt-10 flex flex-wrap justify-center gap-4"
							>
								<Button size="lg" asChild>
									<Link href="/projects">
										View Projects <ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button size="lg" variant="outline" asChild>
									<Link href="/Vishaal_Gopalan_Resume.pdf" download>
										Download CV <FileDown className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
