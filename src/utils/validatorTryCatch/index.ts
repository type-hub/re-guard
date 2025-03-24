export function validatorTryCatch(
  validator: (value: any) => boolean,
  valueToTest: any
): boolean {
  let result: boolean = false

  try {
    result = validator(valueToTest)
  } catch (error) {
    result = false
  }

  return result
}
