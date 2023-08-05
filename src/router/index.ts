import { zodRouter } from "koa-zod-router";
import { validationErrorHandler } from "../utils/errors/errorHandler";

export const router = zodRouter({
  zodRouter: { exposeRequestErrors: true, validationErrorHandler },
});

router.register({
  method: "get",
  path: "/",
  handler: (ctx) => {
    ctx.body = "Hello world";
  },
});
