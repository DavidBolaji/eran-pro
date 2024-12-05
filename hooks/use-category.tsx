import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/actions/get-categories";

export const useCategory = () => {
  const { data: categoryList } = useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => await getCategories(),
  });

  const category = categoryList?.map((cat) => ({
    key: cat.name,
    value: cat.id,
    label: cat.name
  }));
  category?.unshift({label: "All Categories", value: "1", key: "1"})
  return { category };
};
