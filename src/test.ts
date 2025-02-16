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

z.schema.brand<T>().safeParse -> pred
z.schema.parse -> asert

const { importType } = validators

if (importType.guard(v)) {
  v // narrowing
}


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

function assert(): (value: unknown) => asserts value is `${boolean}` {
  return function assertIn(value: unknown): asserts value is `${boolean}` {
    if (!value) {
      throw new Error(`re-guard: assertion failed,`);
    }
  };
}

const SuperTest = assert();
// SuperTest(testValue)
// MY_TEST(testValue);
// testValue;
// ^?

// asrt(testValue);
// testValue;
// ^?

const { hashTag, mention, zod, zodBranded, custom } = collect(regexes)
  .setTypes<RegexesTypes>()
  .build();

// const v = collect(regexes).setTypes<RegexesTypes>().build();
// console.log(v);

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
  //          ^?
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
