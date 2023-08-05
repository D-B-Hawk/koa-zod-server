import { createRouteSpec } from "koa-zod-router";
import { z } from "zod";
import { userSchema } from "../../types";
import { db } from "../../db/db";
import { getErrorMessage } from "../../utils/errors/getErrorMessage";

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
      const newUserId = await db.user.select("id").create(ctx.request.body);

      ctx.status = 201;
      ctx.body = {
        data: newUserId,
      };
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to create new user");

      ctx.status = 400;
      ctx.body = {
        errors: [errorMessage],
      };
    }
  },
});
