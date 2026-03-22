'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { skills } from '@/lib/constants';
import { staggerContainer, fadeIn } from '@/lib/motion';

export function SkillsPreview() {
	const topTechnicalSkills = skills
		.filter((skill) => skill.category === 'technical')
		.sort((a, b) => b.level - a.level)
		.slice(0, 3);

	const topSoftwareSkills = skills
		.filter((skill) => skill.category === 'frameworks')
		.sort((a, b) => b.level - a.level)
		.slice(0, 3);

	const topSoftSkills = skills
		.filter((skill) => skill.category === 'soft')
		.sort((a, b) => b.level - a.level)
		.slice(0, 3);

	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<div className="section-shell">
					<SectionHeader
						title="Technical Skills"
						description="Key competencies and technical expertise that I've developed throughout my engineering journey."
					/>

					<motion.div
						variants={staggerContainer()}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3"
					>
						<motion.div variants={fadeIn('up', 0.1)} className="space-y-6">
							<Card className="card-gradient">
								<CardContent className="p-6">
									<h3 className="mb-4 text-xl font-bold">Technical Expertise</h3>
									<div className="space-y-4">
										{topTechnicalSkills.map((skill, index) => (
											<div key={index}>
												<div className="mb-1 flex justify-between">
													<span>{skill.name}</span>
													<span className="text-muted-foreground">{skill.level}/10</span>
												</div>
												<div className="skill-bar">
													<motion.div
														className="skill-progress"
														initial={{ width: 0 }}
														whileInView={{ width: `${skill.level * 10}%` }}
														viewport={{ once: true }}
														transition={{ duration: 1, delay: index * 0.1 }}
													/>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn('up', 0.2)} className="space-y-6">
							<Card className="card-gradient">
								<CardContent className="p-6">
									<h3 className="mb-4 text-xl font-bold">Frameworks & Libraries</h3>
									<div className="space-y-4">
										{topSoftwareSkills.map((skill, index) => (
											<div key={index}>
												<div className="mb-1 flex justify-between">
													<span>{skill.name}</span>
													<span className="text-muted-foreground">{skill.level}/10</span>
												</div>
												<div className="skill-bar">
													<motion.div
														className="skill-progress"
														initial={{ width: 0 }}
														whileInView={{ width: `${skill.level * 10}%` }}
														viewport={{ once: true }}
														transition={{ duration: 1, delay: index * 0.1 }}
													/>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn('up', 0.3)} className="space-y-6">
							<Card className="card-gradient">
								<CardContent className="p-6">
									<h3 className="mb-4 text-xl font-bold">Soft Skills</h3>
									<div className="space-y-4">
										{topSoftSkills.map((skill, index) => (
											<div key={index}>
												<div className="mb-1 flex justify-between">
													<span>{skill.name}</span>
													<span className="text-muted-foreground">{skill.level}/10</span>
												</div>
												<div className="skill-bar">
													<motion.div
														className="skill-progress"
														initial={{ width: 0 }}
														whileInView={{ width: `${skill.level * 10}%` }}
														viewport={{ once: true }}
														transition={{ duration: 1, delay: index * 0.1 }}
													/>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>

					<div className="mt-10 flex justify-center">
						<Button asChild>
							<Link href="/skills">
								View All Skills <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
