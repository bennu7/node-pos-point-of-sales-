import { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config.InitialOptions = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    verbose: true,
    automock: false,
    // collectCoverage: true,
    // transform: {
    //     "^.+\\.ts$": "ts-jest",
    // },
    // collectCoverageFrom: [
    //     "src/**/*.{ts,js}",
    //     "!src/config/**/*.{ts,js}",
    //     "!src/database/**/*.{ts,js}",
    //     "!src/models/**/*.{ts,js}",
    //     "!src/utils/**/*.{ts,js}",
    //     "!src/app.ts",
    //     "!src/server.ts",
    //     "!**/node_modules/**",
    // ],
    // coverageProvider: "babel",
    // coverageThreshold: {
    //     global: {
    //         branches: 100,
    //         functions: 100,
    //         lines: 100,
    //         statements: 100,
    //     }
    // },
    // preset: "ts-jest",
    // testEnvironment: "node",
};


export default config;