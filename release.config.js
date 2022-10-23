const config = {
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		['@semantic-release/npm', { pkgRoot: './package' }],
		'@semantic-release/github'
	]
};

export default config;
