import { rakeDb } from "rake-db";
import { appCodeUpdater } from "orchid-orm/codegen";
import { config } from "../config";
import { BaseTable } from "./baseTable";
import { AdapterOptions } from "pqb";

const databaseOptions: AdapterOptions[] = [
  { databaseURL: config.dbURL },
  { databaseURL: config.testDbURL },
];

export const change = rakeDb(databaseOptions, {
  baseTable: BaseTable,
  migrationsPath: "./migrations",
  appCodeUpdater: appCodeUpdater({
    tablePath: (tableName) => `./tables/${tableName}.table.ts`,
    ormPath: "./db.ts",
  }),
  useCodeUpdater: true,
  commands: {
    async seed() {
      const { seed } = await import("./seed");
      await seed();
    },
  },
  import: (path) => import(path),
});
