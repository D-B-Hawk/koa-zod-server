import { zodRouter } from "koa-zod-router";

export const router = zodRouter();

router.register({
  method: "get",
  path: "/",
  handler: (ctx) => {
    ctx.body = "Hello world";
  },
});
