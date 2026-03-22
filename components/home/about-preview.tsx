'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { fadeIn } from '@/lib/motion';

export function AboutPreview() {
	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<div className="section-shell">
					<SectionHeader
						title="About Me"
						description="A passionate engineer dedicated to solving complex problems through innovative solutions."
					/>

					<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
						<motion.div
							variants={fadeIn('right', 0.3)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className="media-shell relative h-[400px]"
						>
							<Image
								src="/images/about.jpg"
								alt="Engineer portrait"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</motion.div>

						<motion.div
							variants={fadeIn('left', 0.3)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className="flex flex-col justify-center"
						>
							<h3 className="mb-4 text-2xl font-bold">Professional Engineer</h3>
							<p className="mb-6 text-muted-foreground">
								I&apos;m a dedicated engineering student with a passion for innovation and problem-solving.
								My academic journey has equipped me with strong technical skills and a deep understanding
								of engineering principles that I apply to real-world challenges.
							</p>

							<div className="mb-6 grid grid-cols-2 gap-4">
								<Card className="card-gradient">
									<CardContent className="p-4">
										<h4 className="font-semibold">Education</h4>
										<p className="text-sm text-muted-foreground">B.S. Computer Engineering</p>
									</CardContent>
								</Card>
								<Card className="card-gradient">
									<CardContent className="p-4">
										<h4 className="font-semibold">Experience</h4>
										<p className="text-sm text-muted-foreground">1+ Years</p>
									</CardContent>
								</Card>
								<Card className="card-gradient">
									<CardContent className="p-4">
										<h4 className="font-semibold">Projects</h4>
										<p className="text-sm text-muted-foreground">4+ Completed</p>
									</CardContent>
								</Card>
								<Card className="card-gradient">
									<CardContent className="p-4">
										<h4 className="font-semibold">Awards</h4>
										<p className="text-sm text-muted-foreground">5 Recognitions</p>
									</CardContent>
								</Card>
							</div>

							<Button asChild>
								<Link href="/about">
									Learn More <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
