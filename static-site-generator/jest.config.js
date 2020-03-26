module.exports = {
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "node",
    "svg",
    "ts",
    "tsx",
  ],
  moduleNameMapper: {
    "^-!svg-react-loader.*$": "<rootDir>/test/svgImportMock.js",
    "\\.scss$": "<rootDir>/node_modules/jest-css-modules",
  },
  roots: [
    "<rootDir>/src",
  ],
  setupFilesAfterEnv: [
    "jest-enzyme",
  ],
  testEnvironment: "enzyme",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
};
