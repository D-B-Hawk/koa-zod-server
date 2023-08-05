import { ValidationErrorHandler } from "koa-zod-router";
import { formatZodError } from "./formatZodError";

export const validationErrorHandler: ValidationErrorHandler = async function (
  ctx,
  next
) {
  if (ctx.invalid?.error) {
    ctx.status = 400;
    ctx.body = {
      errors: formatZodError(ctx.invalid),
    };
  } else {
    await next();
  }
  return;
};
