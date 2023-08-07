import { orchidORM } from "orchid-orm";
import { config } from "../config";
import { UserTable } from "./tables/user.table";

export const db = orchidORM(
  {
    databaseURL: config.dbURL,
    log: config.isDevelopment,
  },
  {
    user: UserTable,
  }
);
