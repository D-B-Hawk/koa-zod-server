import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  detectOpenHandles: true,
  setupFilesAfterEnv: ["./jest-setup.ts"],
};

export default jestConfig;
