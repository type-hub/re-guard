export function regexA() {
  return /^import type {[\s]*([\w]+[\s]*)} from .+$/;
}

export function regexB() {
  return /^imp .+$/;
}

export const regexes = {
  regexA,
  regexB,
} as const;

export type RegexesTypes = {
  regexA: `${number}`;
  regexB: `${boolean}`;
};
