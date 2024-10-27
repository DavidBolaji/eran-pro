// utils/getQueryParams.ts
export const getQueryCategoryParams = (url: string) => {
  const urlObj = new URL(url);
  const category = urlObj.searchParams.get("category");
  const name = urlObj.searchParams.get("name");

  return { category, name };
};

export const formatToNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};
