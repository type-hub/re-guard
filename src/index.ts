import { collect } from "./collect";
import { regexes, RegexesTypes } from "./data";

// TODO: blend(), use few regexs to build validators
// TODO: support zod schemas, but isn't zod.brand already a type guard

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

const validators = collect(regexes).brand<RegexesTypes>().build();

const testValue = Math.random() > 0.5 ? "true" : "1";

if (validators.regexA(testValue)) {
  const z = testValue;
  //    ^?
}

if (validators.regexB(testValue)) {
  const z = testValue;
  //    ^?
}
