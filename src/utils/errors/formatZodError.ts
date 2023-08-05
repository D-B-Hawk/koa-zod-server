import { ZodRouterInvalid } from "koa-zod-router";
import { ZodError } from "zod";

export function formatZodError(invalid: ZodRouterInvalid): string[] {
  let messages: string[] = [];
  if (invalid.body && invalid.body instanceof ZodError) {
    for (const { path, message } of invalid.body.issues) {
      messages.push(`${path[0]} field: ${message}`);
    }
  }
  if (invalid.params && invalid.params instanceof ZodError) {
    for (const { path, message } of invalid.params.issues) {
      messages.push(`${path[0]} param: ${message}`);
    }
  }
  if (invalid.headers && invalid.headers instanceof ZodError) {
    for (const { path, message } of invalid.headers.issues) {
      messages.push(`${path[0]} header: ${message}`);
    }
  }
  return messages;
}
