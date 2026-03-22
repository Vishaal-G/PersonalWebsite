'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { projects } from '@/lib/constants';
import { staggerContainer, fadeInScale } from '@/lib/motion';

export function ProjectsPreview() {
	const previewProjects = projects.slice(0, 3);

	return (
		<section className="py-16 md:py-24">
			<div className="container px-4">
				<div className="section-shell section-shell-muted">
					<SectionHeader
						title="Featured Projects"
						description="Explore some of my recent engineering projects and technical work."
					/>

					<motion.div
						variants={staggerContainer()}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
					>
						{previewProjects.map((project, index) => (
							<motion.div
								key={index}
								variants={fadeInScale(index * 0.1)}
								className="flex"
							>
								<Card className="card-gradient flex h-full flex-col">
									<div className="media-shell relative m-4 mb-0 h-48">
										<Image
											src={project.image}
											alt={project.title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>

									<CardContent className="flex-grow p-6">
										<h3 className="mb-2 text-xl font-bold">{project.title}</h3>
										<p className="mb-4 text-muted-foreground">{project.description}</p>

										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag, tagIndex) => (
												<Badge key={tagIndex} variant="secondary">
													{tag}
												</Badge>
											))}
										</div>
									</CardContent>

									<CardFooter className="relative z-10 gap-2 p-6 pt-0">
										{project.link && (
											<Button
												size="sm"
												variant="outline"
												onClick={() => window.open(project.link, '_blank')}
											>
												<ExternalLink className="mr-2 h-4 w-4" />
												Demo
											</Button>
										)}

										{project.repo && (
											<Button
												size="sm"
												variant="outline"
												onClick={() => window.open(project.repo, '_blank')}
											>
												<Github className="mr-2 h-4 w-4" />
												Repo
											</Button>
										)}
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</motion.div>

					<div className="mt-10 flex justify-center">
						<Button asChild>
							<Link href="/projects">
								View All Projects <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
