import { db } from "../../db/db";
import { getErrorMessage } from "./getErrorMessage";

export function errorHandler(error: unknown): {
  status: number;
  errors: string[];
} {
  if (error instanceof db.user.error) {
    if (error.columns.username) {
      return {
        status: 400,
        errors: ["Username is taken"],
      };
    }
    if (error.columns.email) {
      return {
        status: 400,
        errors: ["Email is taken"],
      };
    }
  }
  return {
    status: 500,
    errors: [getErrorMessage(error, "Server Error")],
  };
}
