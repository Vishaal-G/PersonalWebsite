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

	// If you were disabling cache to avoid issues, keep it:
	webpack: (config) => {
		config.cache = false;
		return config;
	},
};

module.exports = nextConfig;
