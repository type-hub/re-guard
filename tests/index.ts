import { collect } from "../dist"
import { inputFuncs, inputTypes } from "./data"

const maybeTrue = Math.random() > 0.5

const randomValue =
  Math.random() > 0.5
    ? "@john_doe"
    : Math.random() > 0.5
    ? "#money"
    : Math.random() > 0.5
    ? true
    : Math.random() > 0.5
    ? "false"
    : "2"

const {
  asserts: a, // computed assertions
  guards, // computed guards
  inputs, // original input functions
} = collect(inputFuncs).setTypes<inputTypes>().build()

// INFO: it must be like that due to TS limitations
export const hashTagAssertion: typeof a.hashTagAssert = a.hashTagAssert
export const mentionAssertion: typeof a.mentionAssert = a.mentionAssert
export const customAssertion: typeof a.customAssert = a.customAssert

// === ASSERTIONS ===

if (maybeTrue) {
  hashTagAssertion(randomValue)
  randomValue
  // ^?
}

if (maybeTrue) {
  mentionAssertion(randomValue)
  randomValue
  // ^?
}

if (maybeTrue) {
  customAssertion(randomValue)
  randomValue
  // ^?
}

// === GUARDS ===

if (guards.hashTagGuard(randomValue)) {
  randomValue
  // ^?
}

if (guards.mentionGuard(randomValue)) {
  randomValue
  // ^?
}

if (guards.mentionGuard(randomValue)) {
  randomValue
  // ^?
}

if (guards.zodBrandedGuard(randomValue)) {
  randomValue
  // ^?
}

if (guards.customGuard(randomValue)) {
  randomValue
  // ^?
}
