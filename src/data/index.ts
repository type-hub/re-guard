import { z } from "zod";

export const regexA = /^import type {[\s]*([\w]+[\s]*)} from .+$/;
export const regexB = /^imp .+$/;

export const regexes = {
  regexA,
  regexB,
  custom: (x: string) => (Math.random() > 0.5 ? true : false),
  zod: z.boolean().brand("zod"),
} as const;

export type RegexesTypes = {
  regexA: `${number}`;
  regexB: `${boolean}`;
  custom: `${string}`;
  zod: z.infer<typeof regexes.zod>;
};
