import { ArrowUpRight, FileText, Github, GraduationCap, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

import { ContactForm } from '@/components/site/contact-form';
import { SiteHeader } from '@/components/site/header';
import { ProjectThumbnail, ProjectVideo } from '@/components/site/project-media';
import { Reveal } from '@/components/site/reveal';
import { blogPosts, education, experiences, projects, siteConfig, skillGroups } from '@/lib/constants';

const featuredProjects = projects.filter((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);

export default function PortfolioPage() {
	return (
		<>
			<SiteHeader />
			<main id="top">
				<Hero />
				<Section id="experience" eyebrow="01 / Experience" title="Where I've worked">
					<Experience />
				</Section>
				<Section id="projects" eyebrow="02 / Projects" title="Things I've built">
					<Projects />
				</Section>
				<Section id="skills" eyebrow="03 / Skills & Education" title="Toolbox">
					<SkillsAndEducation />
				</Section>
				<Section id="writing" eyebrow="04 / Writing" title="Articles">
					<Writing />
				</Section>
				<Section id="contact" eyebrow="05 / Contact" title="Let's talk">
					<Contact />
				</Section>
			</main>
			<Footer />
		</>
	);
}

/* ------------------------------------------------------------------ */

function Hero() {
	return (
		<section className="hero-glow relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
			<div className="container-page">
				<Reveal>
					<p className="eyebrow">Computer Engineering · University of Toronto</p>
					<h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">Vishaal Gopalan</h1>
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
						I build backend systems, iOS clients, and applied ML tools that ship. Most recently a software engineering
						intern at <span className="text-foreground">CIBC</span>, and before that at{' '}
						<span className="text-foreground">Solaris</span>.
					</p>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="mt-9 flex flex-wrap items-center gap-3">
						<a
							href={siteConfig.links.resume}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
						>
							<FileText className="h-4 w-4" /> Resume
						</a>
						<IconLink href={siteConfig.links.github} label="GitHub" icon={<Github className="h-4 w-4" />} />
						<IconLink href={siteConfig.links.linkedin} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
						<IconLink href={`mailto:${siteConfig.links.email}`} label="Email" icon={<Mail className="h-4 w-4" />} />
					</div>
					<p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
						<span className="inline-flex items-center gap-1.5">
							<MapPin className="h-3.5 w-3.5" /> {siteConfig.location}
						</span>
						<span>{siteConfig.citizenship}</span>
					</p>
				</Reveal>

				<Reveal delay={0.2}>
					<a
						href="/"
						className="group mt-14 flex max-w-md items-center gap-4 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40"
					>
						<span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-xl" aria-hidden>
							⚾
						</span>
						<span className="flex-1">
							<span className="block text-sm font-medium">Back to the 3D stadium</span>
							<span className="block text-sm text-muted-foreground">Run the bases of the interactive baseball-stadium portfolio.</span>
						</span>
						<ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
					</a>
				</Reveal>
			</div>
		</section>
	);
}

function Experience() {
	return (
		<ol className="relative space-y-12 border-l border-border pl-6 sm:pl-8">
			{experiences.map((job, index) => (
				<li key={`${job.company}-${job.startDate}`} className="relative">
					<span
						className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background sm:-left-[37px] ${index === 0 ? 'bg-primary' : 'bg-muted-foreground/50'}`}
						aria-hidden
					/>
					<Reveal>
						<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
							<h3 className="text-lg font-semibold">
								{job.company}
								{job.link ? (
									<a href={job.link} target="_blank" rel="noreferrer" className="ml-2 inline-flex align-middle text-muted-foreground hover:text-primary" aria-label={`${job.company} code on GitHub`}>
										<Github className="h-4 w-4" />
									</a>
								) : null}
							</h3>
							<p className="shrink-0 font-mono text-xs text-muted-foreground">
								{job.startDate} — {job.endDate}
							</p>
						</div>
						<p className="mt-0.5 text-sm text-muted-foreground">
							{job.title} · {job.location}
						</p>
						<ul className="mt-4 space-y-2.5">
							{job.description.map((bullet) => (
								<li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
									<span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
									{bullet}
								</li>
							))}
						</ul>
						<div className="mt-4 flex flex-wrap gap-1.5">
							{job.technologies.map((tech) => (
								<span key={tech} className="chip">
									{tech}
								</span>
							))}
						</div>
					</Reveal>
				</li>
			))}
		</ol>
	);
}

function Projects() {
	return (
		<div className="space-y-16">
			{featuredProjects.map((project) => (
				<Reveal key={project.title}>
					<article className="overflow-hidden rounded-2xl border border-border bg-card">
						<ProjectVideo title={project.title} image={project.image} video={project.video} />
						<div className="p-6 sm:p-8">
							<div className="flex flex-wrap items-start justify-between gap-4">
								<div>
									<p className="font-mono text-xs text-muted-foreground">{project.date}</p>
									<h3 className="mt-1 text-2xl font-semibold tracking-tight">{project.title}</h3>
								</div>
								<ProjectLinks repo={project.repo} link={project.link} />
							</div>
							<p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{project.description}</p>

							{project.stats ? (
								<dl className="mt-6 grid grid-cols-3 gap-3">
									{project.stats.map((stat) => (
										<div key={stat.label} className="rounded-xl border border-border bg-background/50 p-3 sm:p-4">
											<dt className="sr-only">{stat.label}</dt>
											<dd className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">{stat.value}</dd>
											<dd className="mt-0.5 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
										</div>
									))}
								</dl>
							) : null}

							{project.highlights ? (
								<ul className="mt-6 space-y-2.5">
									{project.highlights.map((point) => (
										<li key={point} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
											<span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
											{point}
										</li>
									))}
								</ul>
							) : null}

							<div className="mt-6 flex flex-wrap gap-1.5">
								{project.tags.map((tag) => (
									<span key={tag} className="chip">
										{tag}
									</span>
								))}
							</div>
						</div>
					</article>
				</Reveal>
			))}

			<div>
				<h3 className="mb-6 text-sm font-medium text-muted-foreground">More projects</h3>
				<div className="grid gap-5 sm:grid-cols-2">
					{otherProjects.map((project, index) => (
						<Reveal key={project.title} delay={(index % 2) * 0.06} className="h-full">
							<article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
								<ProjectThumbnail title={project.title} image={project.image} video={project.video} />
								<div className="flex flex-1 flex-col p-5">
									<div className="flex items-start justify-between gap-3">
										<h4 className="font-semibold">{project.title}</h4>
										<ProjectLinks repo={project.repo} link={project.link} compact />
									</div>
									<p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
									<div className="mt-4 flex flex-wrap gap-1.5">
										{project.tags.map((tag) => (
											<span key={tag} className="chip">
												{tag}
											</span>
										))}
									</div>
								</div>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</div>
	);
}

function ProjectLinks({ repo, link, compact = false }: { repo?: string; link?: string; compact?: boolean }) {
	const base = compact
		? 'grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground'
		: 'inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground';

	return (
		<div className="flex shrink-0 gap-2">
			{link ? (
				<a href={link} target="_blank" rel="noreferrer" className={base} aria-label="Live demo">
					<ArrowUpRight className="h-4 w-4" />
					{compact ? null : 'Live'}
				</a>
			) : null}
			{repo ? (
				<a href={repo} target="_blank" rel="noreferrer" className={base} aria-label="Source code">
					<Github className="h-4 w-4" />
					{compact ? null : 'Code'}
				</a>
			) : null}
		</div>
	);
}

function SkillsAndEducation() {
	const school = education[0];

	return (
		<div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
			<Reveal className="space-y-7">
				{skillGroups.map((group) => (
					<div key={group.label}>
						<h3 className="mb-3 text-sm font-medium text-muted-foreground">{group.label}</h3>
						<div className="flex flex-wrap gap-2">
							{group.items.map((item) => (
								<span key={item} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</Reveal>

			<Reveal delay={0.08}>
				<div className="rounded-2xl border border-border bg-card p-6">
					<div className="flex items-center gap-3">
						<span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
							<GraduationCap className="h-5 w-5" />
						</span>
						<div>
							<h3 className="font-semibold">{school.institution}</h3>
							<p className="font-mono text-xs text-muted-foreground">
								{school.startDate} — {school.endDate}
							</p>
						</div>
					</div>
					<p className="mt-5 text-sm">
						{school.degree}, <span className="font-medium">{school.field}</span>
					</p>
					{school.minor ? <p className="mt-1 text-sm text-muted-foreground">Minor in {school.minor}</p> : null}
					{school.coursework ? (
						<>
							<p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">Relevant coursework</p>
							<div className="mt-2 flex flex-wrap gap-1.5">
								{school.coursework.map((course) => (
									<span key={course} className="chip">
										{course}
									</span>
								))}
							</div>
						</>
					) : null}
					{school.achievements.length ? (
						<ul className="mt-5 space-y-1 text-sm text-muted-foreground">
							{school.achievements.map((achievement) => (
								<li key={achievement}>🏅 {achievement}</li>
							))}
						</ul>
					) : null}
				</div>
			</Reveal>
		</div>
	);
}

function Writing() {
	return (
		<div className="divide-y divide-border border-y border-border">
			{blogPosts.map((post) => (
				<Reveal key={post.url}>
					<a
						href={post.url}
						target="_blank"
						rel="noreferrer"
						className="group grid gap-1 py-5 sm:grid-cols-[120px_1fr_auto] sm:items-baseline sm:gap-6"
					>
						<span className="font-mono text-xs text-muted-foreground">{post.date}</span>
						<span>
							<span className="font-medium transition-colors group-hover:text-primary">{post.title}</span>
							<span className="mt-1 block text-sm text-muted-foreground">{post.excerpt}</span>
						</span>
						<ArrowUpRight className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
					</a>
				</Reveal>
			))}
		</div>
	);
}

function Contact() {
	return (
		<div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
			<Reveal>
				<p className="text-lg leading-relaxed text-muted-foreground">
					I&apos;m always happy to chat about internships, interesting problems, or anything I&apos;ve built. The fastest
					way to reach me is email.
				</p>
				<ul className="mt-6 space-y-3 text-sm">
					<ContactRow href={`mailto:${siteConfig.links.email}`} icon={<Mail className="h-4 w-4" />} text={siteConfig.links.email} />
					<ContactRow href={siteConfig.links.phone} icon={<Phone className="h-4 w-4" />} text={siteConfig.links.phoneDisplay} />
					<ContactRow href={siteConfig.links.linkedin} icon={<Linkedin className="h-4 w-4" />} text="linkedin.com/in/vishaalgopalan" external />
					<ContactRow href={siteConfig.links.github} icon={<Github className="h-4 w-4" />} text="github.com/Vishaal-G" external />
				</ul>
			</Reveal>
			<Reveal delay={0.08}>
				<div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
					<ContactForm />
				</div>
			</Reveal>
		</div>
	);
}

/* ------------------------------------------------------------------ */

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
	return (
		<section id={id} className="border-t border-border/60 py-20 sm:py-28">
			<div className="container-page">
				<Reveal>
					<p className="eyebrow">{eyebrow}</p>
					<h2 className="mb-12 mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
				</Reveal>
				{children}
			</div>
		</section>
	);
}

function IconLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
	const external = href.startsWith('http');
	return (
		<a
			href={href}
			{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
			className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
		>
			{icon}
			{label}
		</a>
	);
}

function ContactRow({ href, icon, text, external = false }: { href: string; icon: ReactNode; text: string; external?: boolean }) {
	return (
		<li>
			<a
				href={href}
				{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
				className="inline-flex items-center gap-3 text-foreground/85 transition-colors hover:text-primary"
			>
				<span className="text-muted-foreground">{icon}</span>
				{text}
			</a>
		</li>
	);
}

function Footer() {
	return (
		<footer className="border-t border-border/60 py-10">
			<div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
				<p>© {new Date().getFullYear()} Vishaal Gopalan</p>
				<div className="flex items-center gap-5">
					<a href="/" className="hover:text-foreground">
						3D version ⚾
					</a>
					<a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground" aria-label="GitHub">
						<Github className="h-4 w-4" />
					</a>
					<a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground" aria-label="LinkedIn">
						<Linkedin className="h-4 w-4" />
					</a>
				</div>
			</div>
		</footer>
	);
}
