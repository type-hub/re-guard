export type ExcludeUndefined<T> = T extends undefined ? never : T;

export type RegexFactory = () => RegExp;

export type NamedRegexFactory = {
  (): RegExp;
  name: string;
};

export type BrandedRegexFactory = {
  (): RegExp;
  name: string;
  brand: any;
};

export type CreateBrandedRegex<Name extends string, Brand> = {
  (): RegExp;
  name: Name;
  brand: Brand | undefined;
};
