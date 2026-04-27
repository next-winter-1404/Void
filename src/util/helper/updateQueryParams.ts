export function updateQueryParams(
  searchParams: URLSearchParams,
  newValues: Record<string, string>
) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(newValues).forEach(([key, value]) => {
    params.set(key, value);
  });

  return `?${params.toString()}`;
}