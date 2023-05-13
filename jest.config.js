/* eslint-disable no-undef */
module.exports = {
    preset: ['ts-jest', 'react', 'commonjs'],
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      '^.+\\.js?$': 'commonjs',
    },
    transformIgnorePatterns: [
        // '<rootDir>/node_modules/',
        //"node_modules/(?!variables/.*)",
        // "node_modules/(?!reflexy/.*)",
        // "!node_modules/"
    ],
    // eslint-disable-next-line no-undef
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' } )
};
  