import Koa from "koa";
import cors from "@koa/cors";
import { router } from "./router";

export const app = new Koa();

app.use(
  cors({
    origin: "*",
  })
);

app.use(router.routes());
