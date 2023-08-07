import { z } from "zod";
import { UserTable } from "../db/tables/user.table";

export const userSchema = UserTable.schema();

export type User = z.infer<typeof userSchema>;
