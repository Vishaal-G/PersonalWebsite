// Single source of truth for all portfolio content.
// Both the main site (/) and the 3D stadium (/stadium) read from here.

export const siteConfig = {
	name: 'Vishaal Gopalan',
	role: 'Computer Engineering @ University of Toronto',
	tagline:
		'I build backend systems, mobile clients, and applied ML tools that ship. Most recently an SWE intern at CIBC; previously at Solaris.',
	location: 'Toronto, ON',
	citizenship: 'U.S./Canadian Citizen',
	url: 'https://vishaal-gopalan.me',
	nav: [
		{ title: 'Experience', href: '#experience' },
		{ title: 'Projects', href: '#projects' },
		{ title: 'Skills', href: '#skills' },
		{ title: 'Writing', href: '#writing' },
		{ title: 'Contact', href: '#contact' },
	],
	links: {
		github: 'https://github.com/Vishaal-G',
		linkedin: 'https://www.linkedin.com/in/vishaalgopalan/',
		email: 'vishaal2.gopalan@gmail.com',
		phone: 'tel:+14169075950',
		phoneDisplay: '+1 (416) 907-5950',
		// Replace public/Vishaal_Software_Resume.pdf with your latest resume.
		resume: '/Vishaal_Software_Resume.pdf',
		medium: 'https://medium.com/@vishaaltor',
	},
};

export type Experience = {
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string[];
	technologies: string[];
	link?: string;
};

export const experiences: Experience[] = [
	{
		title: 'Software Engineering Intern',
		company: 'CIBC',
		location: 'Toronto, ON',
		startDate: 'May 2026',
		endDate: 'Aug 2026',
		description: [
			'Developed the iOS client for CIBC Spark, a new in-app banking chatbot, using Swift and Kotlin Multiplatform.',
			'Implemented Swift-based analytics event tracking across 8 distinct chatbot interaction events, structuring JSON payloads to Adobe Analytics for real-time monitoring.',
			'Injected MCIDs into the Adobe Experience SDK handshake to uniquely identify users, enabling context-aware responses across 45,500+ daily sessions.',
			'Automated UI test creation using iOS Development Bridge and Bash, generating 20+ test scripts from Jira and increasing user story coverage by 30%.',
		],
		technologies: ['Swift', 'Kotlin Multiplatform', 'Adobe Analytics', 'Bash', 'Jira'],
	},
	{
		title: 'Software Engineering Intern',
		company: 'Solaris',
		location: 'Toronto, ON',
		startDate: 'May 2025',
		endDate: 'Aug 2025',
		description: [
			'Architected a Python REST API backend powering real-time wait times and online triage for 100+ healthcare facilities across 12 municipalities and 5 health regions.',
			'Designed relational and geospatial PostgreSQL data models with region-based tagging and coordinate indexing, improving location-based query speed by 22%.',
			'Aggregated and normalized 3 public healthcare datasets into a unified API, enabling real-time visualization across 30 facilities.',
		],
		technologies: ['Python', 'REST APIs', 'PostgreSQL', 'PostGIS'],
	},
	{
		title: 'Software Engineering Lead',
		company: 'UofT Engineering Student Consulting Association',
		location: 'Toronto, ON',
		startDate: 'Sep 2024',
		endDate: 'Apr 2025',
		description: [
			'Led a team of 6 developers to deliver a full-stack event and application platform with React and FastAPI, replacing manual file-based workflows for 1,000+ users.',
			'Created Python REST APIs backed by PostgreSQL (Supabase) with role-based access control, processing 230 applications per recruitment cycle.',
			'Integrated the Google Drive, Google Photos, and Gmail APIs to automate application file access, email notifications, and photo hosting for 19 events.',
		],
		technologies: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'Google APIs'],
		link: 'https://github.com/uoftesca/utesca-backend',
	},
];

export type Project = {
	title: string;
	/** One-line summary used on cards. */
	description: string;
	/** Longer bullet points shown on featured projects. */
	highlights?: string[];
	/** Key numbers shown as stat chips on featured projects. */
	stats?: { value: string; label: string }[];
	date?: string;
	/** Thumbnail / poster image (path in /public). */
	image: string;
	/** Demo video (path in /public or external URL). */
	video?: string;
	tags: string[];
	/** Live demo URL. */
	link?: string;
	repo?: string;
	featured?: boolean;
};

// TODO(Vishaal): swap the placeholder images/videos below for real screenshots and demo recordings.
const PLACEHOLDER_VIDEO = '/videos/placeholder-demo.mp4';

export const projects: Project[] = [
	{
		title: 'PinPoint',
		date: 'Nov 2026',
		featured: true,
		description:
			'A RAG-powered GitHub bot that reads a new issue and points to the exact functions most likely causing the bug.',
		highlights: [
			'Llama 3.3 LLM agent with tool calling finds the function causing a bug among a median of 13,000+ functions across 12 open-source repos.',
			'Benchmarked 7 retrieval strategies on 300 real bugs in Databricks; the agent ranks the buggy function #1 for 49% of held-out bugs vs. 21% for semantic search.',
			'Ships as a CI/CD bot on GitHub Actions plus a FastAPI service that cites the exact lines behind each result and tags their owners, with caching cutting embedding compute by 65%.',
		],
		stats: [
			{ value: '49%', label: 'top-1 accuracy (vs 21%)' },
			{ value: '300', label: 'real bugs benchmarked' },
			{ value: '65%', label: 'less embedding compute' },
		],
		image: '/images/projects/pinpoint.jpg',
		video: '/videos/pinpoint-demo.mp4',
		tags: ['Python', 'Databricks', 'PySpark', 'Llama 3.3', 'FastAPI', 'GitHub Actions'],
		repo: 'https://github.com/Vishaal-G/PinPoint',
	},
	{
		title: 'FourthCast',
		date: 'Sep 2026',
		featured: true,
		description:
			'A 4th-down decision engine for the NFL: go for it, kick, or punt, backed by models trained on 10 seasons of play-by-play data.',
		highlights: [
			'Trained 6 MLPs from scratch with PyTorch and Pandas on 10 seasons of NFL play-by-play data to predict expected points and win probability added per play call.',
			'Backtested against 8,000+ real NFL coaching decisions: coaches deviate from the optimal call 98% of the time on short-yardage 4th downs.',
			'Found a model blind spot and engineered a new input feature that improved decision confidence by 10x over the original model.',
		],
		stats: [
			{ value: '6', label: 'PyTorch models' },
			{ value: '8,000+', label: 'decisions backtested' },
			{ value: '10x', label: 'confidence gain' },
		],
		image: '/images/projects/fourthcast.jpg',
		video: '/videos/fourthcast-demo.mp4',
		tags: ['Python', 'PyTorch', 'Pandas', 'nfl_data_py', 'Flask', 'React'],
		link: 'https://4th-down-analyzer.vercel.app',
		repo: 'https://github.com/Vishaal-G/4thDownAnalyzer',
	},
	{
		title: 'N3XU$',
		date: 'Jan 2026',
		description:
			'UofTHacks 26: an AI-powered academic dashboard that consolidates course management and technical feedback into one interface.',
		image: '/images/nexus.jpg',
		video: '/images/nexusDemo.mp4',
		tags: ['Python', 'FastAPI', 'Gemini API', 'PostgreSQL', 'Drizzle ORM'],
		repo: 'https://github.com/Vishaal-G/UofTHacks26',
	},
	{
		title: 'ClearRE',
		description:
			'Parses clinical-trial protocol PDFs and extracts objectives, endpoints, eligibility criteria, and treatment details into structured JSON.',
		image: '/images/projects/clearre.jpg',
		link: 'https://solaris-innovations-canada-inc-sflf.b12sites.com/',
		video: PLACEHOLDER_VIDEO,
		tags: ['Python', 'pdfplumber', 'Regex', 'JSON'],
		repo: 'https://github.com/tonytsuisolaris-blip/ClearRE',
	},
	{
		title: 'Moodify',
		description:
			'Detects your mood from text with a Hugging Face Transformers model and generates a matching Spotify playlist in real time.',
		image: '/images/project1.png',
		video: PLACEHOLDER_VIDEO,
		tags: ['Python', 'PyTorch', 'FastAPI', 'Spotify API', 'JavaScript'],
		repo: 'https://github.com/Vishaal-G/Moodify',
	},
	{
		title: 'Piano Tiles',
		description:
			'The Piano Tiles game rebuilt on an FPGA, with Verilog for the hardware design and a shell script driving game logic.',
		image: '/images/project2.png',
		video: '/images/demo.mp4',
		tags: ['Verilog', 'FPGA', 'Shell'],
		repo: 'https://github.com/Vishaal-G/Piano-Tiles',
	},
	{
		title: 'VoltsWagon',
		description: 'MakeUofT: an Arduino robot that picks up trash from the ground, driven by a PS4 controller.',
		image: '/images/robot.jpg',
		video: '/images/robotDemo.mp4',
		tags: ['Arduino', 'C++', 'Python'],
		repo: 'https://github.com/oHqrizon/MakeUofT',
	},
];

export type Education = {
	degree: string;
	field: string;
	minor?: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	coursework?: string[];
	achievements: string[];
};

export const education: Education[] = [
	{
		degree: 'Bachelor of Applied Science',
		field: 'Computer Engineering',
		minor: 'Artificial Intelligence Engineering',
		institution: 'University of Toronto',
		location: 'Toronto, ON',
		startDate: 'Sep 2024',
		endDate: 'May 2028',
		coursework: [
			'Operating Systems',
			'Data Structures & Algorithms',
			'Databases',
			'Distributed Systems',
			'Deep Learning',
		],
		achievements: ['Adams Apple Scholarship Recipient ($7,000)'],
	},
];

export type SkillGroup = {
	label: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		label: 'Languages',
		items: ['Python', 'Swift', 'Kotlin', 'JavaScript', 'SQL', 'Bash'],
	},
	{
		label: 'Frameworks',
		items: [
			'PyTorch',
			'PySpark',
			'Pandas',
			'React',
			'FastAPI',
			'Flask',
			'PostgreSQL',
			'Supabase',
			'SwiftUI',
			'Kotlin Multiplatform',
		],
	},
	{
		label: 'Developer Tools',
		items: ['Git', 'Docker', 'GCP', 'Databricks', 'Jenkins', 'CI/CD', 'Xcode', 'VS Code', 'Claude Code', 'Codex', 'Jira', 'Figma'],
	},
];

/** Flat list, used by the stadium scoreboard. */
export const skills = skillGroups.flatMap((group) => group.items);

export type BlogPost = {
	title: string;
	excerpt: string;
	date: string;
	image: string;
	url: string;
};

export const blogPosts: BlogPost[] = [
	{
		title: 'Options Trading For Dummies',
		excerpt:
			'From basic strategies to advanced techniques: a plain-language guide to how options trading actually works.',
		date: 'Aug 19, 2024',
		image: '/images/blog1.png',
		url: 'https://medium.com/@vishaaltor/options-trading-for-dummies-503add42f935',
	},
	{
		title: 'The Deutsch-Jozsa Problem',
		excerpt:
			'A famous problem in quantum computing that shows how quantum algorithms can beat classical ones.',
		date: 'Jan 13, 2022',
		image: '/images/blog2.png',
		url: 'https://medium.com/@vishaaltor/the-deutsch-jozsa-problem-d5db351f3255',
	},
	{
		title: 'Entangling Protein Through Quantum Simulations',
		excerpt:
			'How quantum simulations are becoming a powerful tool for studying complex biological systems like proteins.',
		date: 'Dec 30, 2021',
		image: '/images/blog3.png',
		url: 'https://medium.com/@vishaaltor/entangling-protein-through-quantum-simulations-273617292c9f',
	},
];
