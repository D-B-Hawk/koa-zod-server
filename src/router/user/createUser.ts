import { createRouteSpec } from "koa-zod-router";
import { z } from "zod";
import { userSchema } from "../../types";
import { db } from "../../db/db";
import { errorHandler } from "../../utils/errors/errorHandler";

const validCreateUserBody = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ValidCreateUserBody = z.infer<typeof validCreateUserBody>;

export const createUserRoute = createRouteSpec({
  method: "post",
  path: "/user",
  validate: {
    body: validCreateUserBody,
  },
  handler: async (ctx) => {
    try {
      const newUserId = await db.user
        .select("id", "username", "createdAt", "updatedAt", "email")
        .create(ctx.request.body);
      ctx.status = 201;
      ctx.body = {
        data: newUserId,
      };
    } catch (error) {
      const { status, errors } = errorHandler(error);
      ctx.status = status;
      ctx.body = {
        errors,
      };
    }
  },
});
