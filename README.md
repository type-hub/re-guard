# re-guard

Type-safe regex suite: build predicates, guards, and assertions from a single regex func

```ts
const {
  asserts: a,
  guards,
  inputs,
} = collect(inputFuncs).setTypes<inputTypes>().build();
```
