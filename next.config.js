const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		unoptimized: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	experimental: {
		outputFileTracingRoot: path.resolve(__dirname),
	},

	// Old multi-page URLs now live as sections on the single-page site.
	async redirects() {
		const sections = { about: 'top', education: 'skills', skills: 'skills', experience: 'experience', projects: 'projects', blog: 'writing', contact: 'contact' };
		return [
			...Object.entries(sections).map(([page, anchor]) => ({ source: `/${page}`, destination: `/portfolio#${anchor}`, permanent: false })),
			{ source: '/fallback', destination: '/portfolio', permanent: false },
			{ source: '/stadium', destination: '/', permanent: false },
			// Older links pointed at these paths for the resume.
			{ source: '/images/Vishaal_Software_Resume.pdf', destination: '/Vishaal_Software_Resume.pdf', permanent: true },
			{ source: '/Vishaal_Gopalan_Resume.pdf', destination: '/Vishaal_Software_Resume.pdf', permanent: true },
		];
	},

	// If you were disabling cache to avoid issues, keep it:
	webpack: (config) => {
		config.cache = false;
		return config;
	},
};

module.exports = nextConfig;
