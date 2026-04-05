'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowUpRight,
	FileDown,
	Github,
	Linkedin,
	Mail,
	Phone,
	X,
} from 'lucide-react';

import { roomObjects, type PortfolioObjectId } from '@/lib/immersive-room';
import { blogPosts, education, experiences, projects, siteConfig, skills } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ContentOverlay() {
	const { activePanel: activeObject, setActivePanel, setOverlayVisible } = useStore();
	const technicalSkills = skills.filter((skill) => skill.category === 'technical');
	const frameworkSkills = skills.filter((skill) => skill.category === 'frameworks');
	const softSkills = skills.filter((skill) => skill.category === 'soft');
	const languageSkills = skills.filter((skill) => skill.category === 'language');
	const activeMeta = roomObjects.find((object) => object.id === activeObject);
	const onClose = () => {
		setActivePanel(null);
		setOverlayVisible(false);
	};

	const renderBody = () => {
		switch (activeObject) {
			case 'projects':
				return (
					<div className="space-y-5">
						{projects.map((project) => (
							<div key={project.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
								<div className="relative mb-4 h-40 overflow-hidden rounded-[1rem] border border-white/10">
									<Image src={project.image} alt={project.title} fill className="object-cover" />
								</div>
								<h3 className="text-xl font-semibold">{project.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<Badge key={tag} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
								<div className="mt-4 flex flex-wrap gap-3">
									{project.link && (
										<Button size="sm" variant="outline" asChild>
											<Link href={project.link} target="_blank" rel="noreferrer">
												Live / Demo <ArrowUpRight className="ml-2 h-4 w-4" />
											</Link>
										</Button>
									)}
									{project.repo && (
										<Button size="sm" variant="outline" asChild>
											<Link href={project.repo} target="_blank" rel="noreferrer">
												GitHub <Github className="ml-2 h-4 w-4" />
											</Link>
										</Button>
									)}
								</div>
							</div>
						))}
					</div>
				);
			case 'resume':
				return (
					<div className="space-y-6">
						<div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
							<p className="text-sm uppercase tracking-[0.22em] text-primary">Resume Snapshot</p>
							<h3 className="mt-2 text-2xl font-semibold">Computer Engineering student with a backend and AI edge.</h3>
							<p className="mt-3 text-sm text-muted-foreground">
								I&apos;m focused on building polished, useful systems across backend engineering,
								intelligent tooling, and interface design. This room is meant to feel like a piece
								of software you can explore rather than a static portfolio page.
							</p>
							<div className="mt-5 flex flex-wrap gap-3">
								<Button asChild>
									<Link href="/Vishaal_Gopalan_Resume.pdf" download>
										Download Resume <FileDown className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href="/experience">Open Full Experience</Link>
								</Button>
							</div>
						</div>
						<div className="grid gap-4">
							<div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
								<h4 className="font-semibold">Experience Highlights</h4>
								<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
									{experiences.map((exp) => (
										<li key={exp.title}>
											<span className="font-medium text-foreground">{exp.title}</span> at {exp.company}
										</li>
									))}
								</ul>
							</div>
							<div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
								<h4 className="font-semibold">Education</h4>
								<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
									{education.map((item) => (
										<li key={item.degree}>
											<span className="font-medium text-foreground">{item.degree}</span>, {item.institution}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				);
			case 'skills': {
				const clusters = [
					{ title: 'Languages', items: [...technicalSkills, ...languageSkills].slice(0, 6), tone: 'from-[#ffe37d] to-[#e8c459]' },
					{ title: 'Frameworks', items: frameworkSkills.slice(0, 6), tone: 'from-[#ffb891] to-[#e8866d]' },
					{ title: 'Soft Skills', items: softSkills.slice(0, 5), tone: 'from-[#b8f7da] to-[#78d6b3]' },
				];

				return (
					<div className="grid gap-4 md:grid-cols-2">
						{clusters.map((cluster) => (
							<div
								key={cluster.title}
								className={`rounded-[1.35rem] bg-gradient-to-br ${cluster.tone} p-4 text-[#101217] shadow-[0_18px_40px_-26px_rgba(0,0,0,0.7)]`}
							>
								<h3 className="text-lg font-semibold">{cluster.title}</h3>
								<ul className="mt-4 space-y-3 text-sm">
									{cluster.items.map((skill) => (
										<li key={`${cluster.title}-${skill.name}`} className="flex items-center justify-between gap-4">
											<span>{skill.name}</span>
											<span className="font-semibold text-black/70">{skill.level}/10</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				);
			}
			case 'about':
				return (
					<div className="space-y-5">
						<div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10">
							<Image src="/images/about.jpg" alt="Vishaal Gopalan portrait" fill className="object-cover" />
						</div>
						<div className="space-y-4 text-sm text-muted-foreground">
							<p>
								I&apos;m a Computer Engineering student at the University of Toronto with a strong interest in
								machine learning, intelligent systems, and products that make technical work feel simpler.
							</p>
							<p>
								Most of my work lives at the intersection of backend systems, applied AI, and sharp user
								experience. I like building things that feel useful immediately, but still have depth under the hood.
							</p>
							<p>
								This room is intentionally part portfolio and part world-building exercise: technical, cinematic,
								and quietly playful.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<Button variant="outline" asChild>
								<Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
									LinkedIn <Linkedin className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
									GitHub <Github className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				);
			case 'hobbies':
				return (
					<div className="space-y-5">
						<div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
							<h3 className="text-xl font-semibold">Beyond the Coursework</h3>
							<p className="mt-3 text-sm text-muted-foreground">
								I like projects that blur the line between engineering discipline and creative experimentation.
								That usually means building things around AI, music, robotics, interfaces, and whatever feels like
								a good excuse to learn a new system deeply.
							</p>
						</div>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
								<h4 className="font-semibold">Current Interests</h4>
								<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
									<li>Machine learning and intelligent feedback systems</li>
									<li>Robotics prototypes and embedded builds</li>
									<li>Audio-driven and emotionally aware product ideas</li>
								</ul>
							</div>
							<div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
								<h4 className="font-semibold">Desk Energy</h4>
								<p className="mt-3 text-sm text-muted-foreground">
									If the laptop is for shipping, the mug is for staying curious. The best builds usually start
									with one idea that feels a little too ambitious and then gradually becomes real.
								</p>
							</div>
						</div>
					</div>
				);
			case 'education':
				return (
					<div className="space-y-4">
						{education.map((item) => (
							<div key={item.degree} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 className="text-xl font-semibold">{item.degree}</h3>
										<p className="text-sm text-primary">{item.field}</p>
									</div>
									<p className="text-sm text-muted-foreground">
										{item.startDate} - {item.endDate}
									</p>
								</div>
								<p className="mt-3 text-sm text-muted-foreground">
									{item.institution}, {item.location}
								</p>
								<ul className="mt-4 space-y-2 text-sm text-muted-foreground">
									{item.achievements.map((achievement) => (
										<li key={achievement} className="flex items-start gap-2">
											<span className="mt-1 h-2 w-2 rounded-full bg-primary" />
											<span>{achievement}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				);
			case 'contact':
				return (
					<div className="space-y-5">
						<div className="grid gap-4">
							<div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
								<div className="flex items-center gap-3">
									<Mail className="h-5 w-5 text-primary" />
									<Link href={`mailto:${siteConfig.links.email}`} className="text-sm text-muted-foreground hover:text-primary">
										{siteConfig.links.email}
									</Link>
								</div>
							</div>
							<div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
								<div className="flex items-center gap-3">
									<Phone className="h-5 w-5 text-primary" />
									<Link href={siteConfig.links.phone} className="text-sm text-muted-foreground hover:text-primary">
										+1 416 907 5950
									</Link>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap gap-3">
							<Button variant="outline" asChild>
								<Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
									LinkedIn <Linkedin className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
									GitHub <Github className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button asChild>
								<Link href="/contact">Open Contact Form</Link>
							</Button>
						</div>
					</div>
				);
			case 'blog':
				return (
					<div className="space-y-4">
						{blogPosts.map((post) => (
							<div key={post.slug} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
								<p className="text-xs uppercase tracking-[0.18em] text-primary">{post.date}</p>
								<h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
								<p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
								<Button className="mt-4" size="sm" variant="outline" asChild>
									<Link href={post.url} target="_blank" rel="noreferrer">
										Read Article <ArrowUpRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						))}
					</div>
				);
			case 'awards': {
				const allAchievements = education.flatMap((item) =>
					item.achievements.map((achievement) => ({
						label: achievement,
						context: `${item.institution} - ${item.endDate}`,
					}))
				);

				return (
					<div className="space-y-4">
						{allAchievements.map((achievement) => (
							<div key={achievement.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
								<h3 className="text-lg font-semibold">{achievement.label}</h3>
								<p className="mt-2 text-sm text-muted-foreground">{achievement.context}</p>
							</div>
						))}
					</div>
				);
			}
			case 'experience':
				return (
					<div className="space-y-4">
						{experiences.map((item) => (
							<div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 className="text-xl font-semibold">{item.title}</h3>
										<p className="text-sm text-primary">{item.company}</p>
									</div>
									<p className="text-sm text-muted-foreground">
										{item.startDate} - {item.endDate}
									</p>
								</div>
								<p className="mt-3 text-sm text-muted-foreground">{item.location}</p>
								<ul className="mt-4 space-y-2 text-sm text-muted-foreground">
									{item.description.map((bullet) => (
										<li key={bullet} className="flex items-start gap-2">
											<span className="mt-1 h-2 w-2 rounded-full bg-secondary" />
											<span>{bullet}</span>
										</li>
									))}
								</ul>
								<div className="mt-4 flex flex-wrap gap-2">
									{item.technologies.map((tech) => (
										<Badge key={tech} variant="secondary">
											{tech}
										</Badge>
									))}
								</div>
							</div>
						))}
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<AnimatePresence>
			{activeObject && (
				<>
					<motion.div
						className="fixed inset-0 z-30 bg-black/45 backdrop-blur-[3px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>
					<motion.aside
						className="fixed inset-y-4 right-4 z-40 flex w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(8,17,29,0.95),rgba(11,27,44,0.92))] shadow-[0_40px_90px_-46px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
						initial={{ x: 420, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 420, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 220, damping: 28 }}
					>
						<div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
							<div>
								<p className="text-xs uppercase tracking-[0.24em] text-primary">Object Interface</p>
								<h2 className="mt-2 text-2xl font-semibold">{activeMeta?.shortLabel ?? activeObject}</h2>
								<p className="mt-2 text-sm text-muted-foreground">
									{activeMeta?.hint ?? 'Exploring portfolio content through the selected desk object.'}
								</p>
							</div>
							<Button size="icon" variant="ghost" onClick={onClose} aria-label="Close panel">
								<X className="h-5 w-5" />
							</Button>
						</div>
						<div className="flex-1 overflow-y-auto px-5 py-5">{renderBody()}</div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
}
