/** @type {import('next').NextConfig} */
const nextConfig = {
	// IMPORTANT: remove output: 'export' unless you specifically want a static export
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		unoptimized: true,
	},
	devIndicators: false,

	// This "experimental" block is not needed and often causes build instability.
	// Remove it.
	// experimental: {},

	// If you were disabling cache to avoid issues, keep it:
	webpack: (config) => {
		config.cache = false;
		return config;
	},
};

module.exports = nextConfig;
