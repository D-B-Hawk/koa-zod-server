import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const env = z
  .object({
    SERVER_PORT: z.coerce.number().default(3000),
    NODE_ENV: z
      .literal("development")
      .or(z.literal("production"))
      .or(z.literal("test"))
      .default("development"),
    PG_DB_HOST: z.string({
      required_error: "PG_DB_HOST env variable is required",
    }),
    PG_TEST_DB_HOST: z.string({
      required_error: "PG_TEST_DB_HOST env variable is required",
    }),
    PG_DB_NAME: z.string({
      required_error: "PG_DB_NAME env variable is required",
    }),
    PG_TEST_DB_NAME: z.string({
      required_error: "PG_TEST_DB_NAME env variable is required",
    }),
    PG_DB_USER: z.string({
      required_error: "PG_DB_USER env variable is required",
    }),
    PG_TEST_DB_USER: z.string({
      required_error: "PG_TEST_DB_USER env variable is required",
    }),
    PG_DB_PASSWORD: z.string().optional(),
    PG_TEST_DB_PASSWORD: z.string().optional(),
  })
  .parse(process.env);

const isDevelopment = env.NODE_ENV === "development";

const pgDbHost = isDevelopment ? env.PG_DB_HOST : env.PG_TEST_DB_HOST;
const pgDbName = isDevelopment ? env.PG_DB_NAME : env.PG_TEST_DB_NAME;
const pgDbUser = isDevelopment ? env.PG_DB_USER : env.PG_TEST_DB_USER;
const pgDbPassword = isDevelopment
  ? env.PG_DB_PASSWORD
  : env.PG_TEST_DB_PASSWORD;

const dbURL = `postgres://${pgDbUser}:${pgDbPassword}@${pgDbHost}:5432/${pgDbName}`;
const testDbURL = `postgres://${env.PG_TEST_DB_USER}:${env.PG_TEST_DB_PASSWORD}@${env.PG_TEST_DB_HOST}:5432/${env.PG_TEST_DB_NAME}`;

export const config = {
  serverPort: env.SERVER_PORT,
  dbURL,
  testDbURL,
  isDevelopment,
};
