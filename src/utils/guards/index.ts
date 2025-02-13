import { ZodType } from "zod/lib/types";

export function isRegex(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

export function isZodSchema(value: unknown): value is ZodType {
  return (
    typeof value === "object" &&
    value !== null &&
    "safeParse" in value &&
    "parse" in value
  );
}
