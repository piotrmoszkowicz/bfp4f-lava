module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@util/(.*)$": "<rootDir>/src/util/$1"
  },
  preset: "ts-jest",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/test/**/*.test.(ts|js)"
  ]
};
