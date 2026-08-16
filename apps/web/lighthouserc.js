module.exports = {
    ci: {
        collect: {
            url: ['https://jprojects.dev'],
            numberOfRuns: 1,
        },
        assert: {
            assertions: {
                "categories:performance": ["warn", { "minScore": 1 }],
                "categories:accessibility": ["warn", { "minScore": 1 }],
                "categories:bestPractices": ["warn", { "minScore": 1 }],
                "categories:seo": ["warn", { "minScore": 1 }],
            },
        },
    },
};