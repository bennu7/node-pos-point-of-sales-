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
    modulePaths: [compilerOptions.baseUrl], // for modulePaths connect to /src
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths), // for jest to understand the path alias like @/utils
    verbose: true,
    automock: false,
};


export default config;