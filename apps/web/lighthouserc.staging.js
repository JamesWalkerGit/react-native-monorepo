module.exports = {
    ci: {
        collect: {
            url: ['https://staging.jprojects.dev'],
            numberOfRuns: 1,
        },
        assert: {
            assertions: {
                "categories:performance": ["warn", { "minScore": .85 }],
                "categories:accessibility": ["error", { "minScore": 1 }],
                "categories:bestPractices": ["error", { "minScore": 1 }],
                "categories:seo": ["error", { "minScore": 1 }],
            },
        },
    },
};