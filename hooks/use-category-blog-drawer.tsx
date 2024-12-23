"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useCategoryBlogDrawer = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["CATEGORY_BLOG_DRAWER"])) {
    queryClient.setQueryData(["CATEGORY_BLOG_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["CATEGORY_BLOG_DRAWER"], () => isOpen);
  };

  const { data: categoryDrawer } = useQuery({
    queryKey: ["CATEGORY_BLOG_DRAWER"],
    queryFn: () => queryClient.getQueryData(["CATEGORY_BLOG_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, categoryDrawer };
};
