import { collect } from "./collect"
import { inputFuncs, inputTypes } from "./data"

const testValue =
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
  asserts: a,
  guards,
  inputs,
} = collect(inputFuncs).setTypes<inputTypes>().build()

inputs.hashTagRegex

if (guards.hashTagGuard(testValue)) {
  console.log(testValue)
  //          ^?
}

if (guards.mentionGuard(testValue)) {
  console.log(testValue)
  //          ^?
}

if (guards.mentionGuard(testValue)) {
  console.log(testValue)
  //          ^?
}

if (guards.zodBrandedGuard(testValue)) {
  console.log(testValue)
  //          ^?
}

if (guards.customGuard(testValue)) {
  console.log(testValue)
  //          ^?
}

export const hashTagAssertion: typeof a.hashTagAssert = a.hashTagAssert

testValue
// ^?
hashTagAssertion(testValue)
testValue
// ^?
