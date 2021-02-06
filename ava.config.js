export default {
    files: ['src/**/*.test.ts'],
    extensions: ['ts'],
    require: ['ts-node/register'],
    verbose: true,
    concurrency: 5,
    failFast: false,
    failWithoutAssertions: false,
};
