import { z } from "zod";
import { tableToZod } from "orchid-orm-schema-to-zod";
import { UserTable } from "../db/tables/user.table";

export const userSchema = tableToZod(UserTable);

type User = z.infer<typeof userSchema>;
