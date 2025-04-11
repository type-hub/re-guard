# re-guard

Type-safe regex suite: build predicates, guards, and assertions from a single regex function.

## Installation

```bash
npm install @type-hub/re-guard
```

# Goal

```ts
import { collect } from "@type-hub/re-guard"
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

// } = collect(inputFuncs).setTypes<inputTypes>().build()
const {
  asserts: a, // computed assertions
  guards, // computed guards
  inputs, // original input functions
} = collect<typeof inputFuncs, inputTypes>(inputFuncs)

// INFO: it must be like that due to TS limitations
export const hashTagAssertion: typeof a.hashTagAssert = a.hashTagAssert
export const mentionAssertion: typeof a.mentionAssert = a.mentionAssert
export const customAssertion: typeof a.customAssert = a.customAssert
```

## Features

- **Type-safe**: Full TypeScript support with accurate type inference
- **Guards & Assertions**: Generate both type guards and assertions from your regex patterns
- **Single Source**: Define patterns once, use them everywhere
- **Zod Integration**: Seamless integration with Zod schemas
- **Zero Dependencies**: Lightweight and efficient

## Usage

### Basic Example

```typescript
import { collect } from "@type-hub/re-guard"

// Define your input functions (regex patterns)
const inputFuncs = {
  hashTag: (value: unknown) =>
    typeof value === "string" && /^#[a-zA-Z0-9]+$/.test(value),
  mention: (value: unknown) =>
    typeof value === "string" && /^@[a-zA-Z0-9_]+$/.test(value),
  custom: (value: unknown) =>
    typeof value === "boolean" || value === "true" || value === "false",
}

// Define your expected types
type InputTypes = {
  hashTag: string
  mention: string
  custom: boolean
}

// Create guards and assertions
const {
  asserts, // Type assertions
  guards, // Type guards
  inputs, // Original input functions
} = collect(inputFuncs).setTypes<InputTypes>().build()

// Using guards
if (guards.hashTagGuard(someValue)) {
  // someValue is typed as string here
  console.log(someValue)
}

// Using assertions
asserts.mentionAssert(someValue) // Throws if invalid
// someValue is typed as string after assertion

// Using with Zod (if you have Zod schemas)
const zodSchema = z.string().min(5)
const { guards: zodGuards } = collect({ myField: zodSchema }).build()
```

### Type Guards vs Assertions

- **Type Guards** (`guards`): Runtime checks that narrow types in TypeScript
- **Assertions** (`asserts`): Runtime validations that throw errors for invalid values

### Advanced Usage

```typescript
// Mixing regular functions and Zod schemas
const mixedInputs = {
  email: z.string().email(),
  customRegex: (value: unknown) =>
    typeof value === "string" && /^[A-Z]+$/.test(value),
}

const { guards, asserts } = collect(mixedInputs).build()

// Type inference works automatically
const emailGuard = guards.emailGuard // Inferred return type: string
const regexGuard = guards.customRegexGuard // Inferred return type: string
```

## API Reference

### `collect(inputLookup)`

Main function to create type guards and assertions.

#### Parameters:

- `inputLookup`: Record of input functions or Zod schemas

#### Returns:

Object containing:

- `guards`: Type guard functions
- `asserts`: Assertion functions
- `inputs`: Original input functions

## Error Handling

Assertions throw errors when validation fails. Make sure to handle these errors appropriately in your code:

```typescript
try {
  asserts.emailAssert(value)
} catch (error) {
  console.error("Validation failed:", error.message)
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
