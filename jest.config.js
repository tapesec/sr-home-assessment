module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    },
    modulePathIgnorePatterns: ["<rootDir>/built/"],
    verbose: true
};