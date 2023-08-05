import { zodRouter } from "koa-zod-router";
import { createUserRoute } from "./user/createUser";
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

router.register(createUserRoute);
