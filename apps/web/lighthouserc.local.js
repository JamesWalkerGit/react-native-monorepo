module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000'],
            numberOfRuns: 1,
            startServerCommand: 'yarn dev',
        },
        assert: {
            assertions: {
                "categories:performance": ["warn", { "minScore": .65 }],
                "categories:accessibility": ["error", { "minScore": 1 }],
                "categories:bestPractices": ["error", { "minScore": 1 }],
                "categories:seo": ["error", { "minScore": 1 }],
            },
        },
    },
};