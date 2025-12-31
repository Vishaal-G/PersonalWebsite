export const siteConfig = {
	name: 'Engineering Portfolio',
	description:
		'A professional portfolio website template for engineering students.',
	mainNav: [
		{
			title: 'Home',
			href: '/',
		},
		{
			title: 'About',
			href: '/about',
		},
		{
			title: 'Education',
			href: '/education',
		},
		{
			title: 'Skills',
			href: '/skills',
		},
		{
			title: 'Experience',
			href: '/experience',
		},
		{
			title: 'Projects',
			href: '/projects',
		},
		{
			title: 'Blog',
			href: '/blog',
		},
		{
			title: 'Contact',
			href: '/contact',
		},
	],
	links: {
		github: 'https://github.com/Vishaal-G',
		linkedin: 'https://www.linkedin.com/in/vishaalgopalan/',
		twitter: 'https://twitter.com/yourusername',
		facebook: 'https://facebook.com/yourusername',
		instagram: 'https://www.instagram.com/vishxxl_27/',
		whatsapp: 'https://wa.me/yourphonenumber',
		email: 'vishaaltor@gmail.com',
		phone: 'tel:+14169075950',
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
};

export const experiences: Experience[] = [
	{
		title: 'Backend Engineer Intern',
		company: 'Solaris',
		location: 'Toronto, Canada',
		startDate: 'June 2025',
		endDate: 'Present',
		description: [
			'Implemented foundational backend system used to manage and deliver healthcare facility data for the Toronto area.',
			'Defined data models based on the schema including facilities, regions, and location fields',
			'Implemented hospitals API endpoint to serve GTA healthcare facility data in a read-only format',
		],
		technologies: ['Python', 'PyTorch', 'FastAPI', 'Git'],
	},
	{
		title: 'Executive Software Engineer',
		company: 'UofT Engineering Student Consulting Association',
		location: 'Toronto, Canada',
		startDate: 'Jan 2025',
		endDate: 'Present',
		description: [
			'Designed a full-stack internal management system, replacing manual file-based processes with a database-driven architecture.',
			'Developed backend APIs using Python and FastAPI, integrated with Supabase PostgreSQL to enable role-based authentication and event management.',
			'Integrated Google Photos API for event photo hosting, Google Drive API for application file access, and Supabase Email/Gmail API for automated notifications.',
		],
		technologies: ['Python', 'PostgreSQL', 'Google Photos API', 'Git'],
	},
];

export type Project = {
	title: string;
	description: string;
	image: string;
	tags: string[];
	link?: string;
	repo?: string;
};

export const projects: Project[] = [
	{
		title: 'Moodify',
		description:
			'Designed and built an AI-powered music recommendation system that analyzes user emotions and generates personalized Spotify playlists in real time.',
		image: '/images/project1.png',
		tags: ['Python', 'Spotify API', 'PyTorch', 'JavaScript'],
		link: 'https://github.com/Vishaal-G/Moodify',
		repo: 'https://github.com/Vishaal-G/Moodify',
	},
	{
		title: 'Piano Tiles',
		description:
			'Replicated the piano tiles video game on an FPGA using Verilog for hardware design and a shell script for game logic and user interaction.',
		image: '/images/project2.png',
		tags: ['Verilog', 'Shell', 'FPGA'],
		link: '/images/demo.mp4',
		repo: 'https://github.com/Vishaal-G/Piano-Tiles',
	},
	{
		title: 'VoltsWagon',
		description:
			'Designed an Arduino based robotic system that picks up trash from ground using PS4 controller input.',
		image: '/images/robot.jpg',
		tags: ['Arduino', 'Python', 'C++'],
		link: '/images/robotDemo.mp4',
		repo: 'https://github.com/oHqrizon/MakeUofT',
	},
];

export type Education = {
	degree: string;
	field: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	gpa?: string;
	achievements: string[];
};

export const education: Education[] = [
	{
		degree: 'Bachelor of Engineering',
		field: 'Computer Engineering',
		institution: 'University Of Toronto',
		location: 'Toronto, Canada',
		startDate: 'Sep 2024',
		endDate: 'May 2028',
		achievements: [
			'Adams Apple Scholarship Recipient ($7000)',
		],
	},
	{
		degree: 'High School Diploma',
		field: 'International Baccalaureate',
		institution: 'Maple High School',
		location: 'Vaughan, Canada',
		startDate: 'Sep 2019',
		endDate: 'Jun 2024',
		achievements: [
			'Dean’s List Honor Roll (2020-2024)',
			'CSMC Competition Finalist',
		],
	},
];



export type Skill = {
	name: string;
	level: number; // 1-10
	category: 'technical' | 'frameworks' | 'soft' | 'language';
};

export const skills: Skill[] = [
	// Technical Skills
	{ name: 'Python', level: 9, category: 'technical' },
	{ name: 'JavaScript', level: 8, category: 'technical' },
	{ name: 'C++', level: 7, category: 'technical' },
	{ name: 'Verilog', level: 8, category: 'technical' },
	{ name: 'C', level: 6, category: 'technical' },

	// Frameworks Skills
	{ name: 'PyTorch', level: 9, category: 'frameworks' },
	{ name: 'React', level: 8, category: 'frameworks' },
	{ name: 'ROS', level: 9, category: 'frameworks' },
	{ name: 'Python', level: 7, category: 'frameworks' },
	{ name: 'Fusion360', level: 6, category: 'frameworks' },
	{ name: 'MATLAB', level: 8, category: 'frameworks' },

	// Soft Skills
	{ name: 'Problem Solving', level: 9, category: 'soft' },
	{ name: 'Team Leadership', level: 8, category: 'soft' },
	{ name: 'Project Management', level: 7, category: 'soft' },
	{ name: 'Technical Writing', level: 8, category: 'soft' },
	{ name: 'Presentation', level: 7, category: 'soft' },

	// Languages
	{ name: 'English', level: 10, category: 'language' },
	{ name: 'French', level: 5, category: 'language' },
	{ name: 'Tamil', level: 8, category: 'language' },
];

export type BlogPost = {
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image: string;
	slug: string;
	url: string;
};

export const blogPosts: BlogPost[] = [
	{
		title: 'Options Trading For Dummies',
		excerpt: 'Exploring the latest innovations in options trading and how it works, from basic strategies to advanced techniques. Navigate the world of options trading.',
		date: 'Aug 19, 2024',
		author: 'Vishaal Gopalan',
		image: 'images/blog1.png',
		slug: 'options-trading-for-dummies',
		url: 'https://medium.com/@vishaaltor/options-trading-for-dummies-503add42f935'
	},
	{
		title: 'The Deutsch-Jozsaa Problem',
		excerpt: 'The Deutsch-Jozsaa problem is a famous problem in quantum computing that demonstrates the power of quantum algorithms over classical ones.',
		date: 'Jan 13, 2022',
		author: 'Vishaal Gopalan',
		image: 'images/blog2.png',
		slug: 'the-deutsch-jozsaa-problem',
		url: 'https://medium.com/@vishaaltor/the-deutsch-jozsa-problem-d5db351f3255'
	},
	{
		title: 'Entangling Protein Through Quantum Simulations',
		excerpt: 'Quantum simulations have emerged as a powerful tool for studying complex biological systems, including proteins.',
		date: 'Dec 30, 2021',
		author: 'Vishaal Gopalan',
		image: 'images/blog3.png',
		slug: 'entangling-protein-through-quantum-simulations',
		url: 'https://medium.com/@vishaaltor/entangling-protein-through-quantum-simulations-273617292c9f'
	},
];