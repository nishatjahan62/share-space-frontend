export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Reads the listed keys from a page's searchParams and returns single string values
export async function readParams<K extends string>(
  searchParams: SearchParams,
  keys: readonly K[],
): Promise<Record<K, string | undefined>> {
  const sp = await searchParams;
  return Object.fromEntries(
    keys.map((key) => {
      const value = sp[key];
      return [key, Array.isArray(value) ? value[0] : value];
    }),
  ) as Record<K, string | undefined>;
}