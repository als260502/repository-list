const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  clearMocks: true,
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  modulePaths: ["<rootDir>"],
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/styles/__mocks__/styleMock.js",
  },
};

module.exports = createJestConfig(customJestConfig);
