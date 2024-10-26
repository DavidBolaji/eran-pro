// utils/getQueryParams.ts
export const getQueryCategoryParams = (url: string) => {
  const urlObj = new URL(url);
  const category = urlObj.searchParams.get("category");
  const name = urlObj.searchParams.get("name");

  return { category, name };
};
