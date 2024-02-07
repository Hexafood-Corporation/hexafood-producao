module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  coveragePathIgnorePatterns: [
    '.dto.ts$',
    '.schema.ts$',
    '.controller.ts$',
    '.repository.ts$',
    '.module.ts$'
  ],
};
