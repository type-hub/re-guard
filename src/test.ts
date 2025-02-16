import { buildAssertion } from "./buildAssertion";
import { collect } from "./collect";
import { createBrandedFunction } from "./createBrandedFunction";
import { regexes, RegexesTypes } from "./data";

/*

TODO:
- blend(), use few regexs to build validators
- create generator that will add assertions automatically
- add try/catch at validation level to support wrong inputs
- create two modes: typed in and untyped in checks
- create tests for all inputs
- create explanation for all type issues
- create single entry func
- create multi entry func


DONE:
- support arrays of regexes and funcs
- support arrays of non bool funcs
- support zod schemas, but isn't zod.brand already a type guard
- open type for regexes
- support zod brand output for type guards

*/
// TEST ----------------------------

/*

validator.importType
- pred
- guard
- asset
- regex
- brand + GetBrand
- meta (original data)
- ?schema (org zod schema)
- ...

*/
const testValue =
  Math.random() > 0.5
    ? "@john_doe"
    : Math.random() > 0.5
    ? "#money"
    : Math.random() > 0.5
    ? true
    : "2";

const brf = createBrandedFunction<"super-type">()(/a/, "super-name");
const asrt = buildAssertion(brf);

const { hashTag, mention, zod, zodBranded, custom } = collect(regexes)
  .setTypes<RegexesTypes>()
  .build();

// const v = collect(regexes).setTypes<RegexesTypes>().build();
// const x =(hashTag.regex.test('a'), zod.regex.test('a'));

if (hashTag.guard(testValue)) {
  console.log(testValue);
  //          ^?
}

if (mention.guard(testValue)) {
  console.log(testValue);
  //          ^?
}

if (zod.guard(testValue)) {
  console.log(testValue);
  //          ^?const SuperTest = assert();
  // SuperTest(testValue)
  // MY_TEST(testValue);
  // testValue;
  // ^?

  // asrt(testValue);
  // testValue;
  // ^?
}

if (zodBranded.guard(testValue)) {
  console.log(testValue);
  //          ^?
}

//

if (custom.guard(testValue)) {
  console.log(testValue);
  //          ^?
}

export const hashTagAssertion: typeof hashTag.assert = hashTag.assert;
console.log(hashTag, testValue);
hashTagAssertion(testValue);

testValue;
