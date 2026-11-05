import { ZodError } from "zod";

export function getValidationMessages(error: ZodError): string[] {
  return error.issues.map((issue) => issue.message);
}
