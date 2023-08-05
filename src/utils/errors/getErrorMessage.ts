export function getErrorMessage(
  error: unknown,
  defaultMessage: string
): string {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return defaultMessage;
}
