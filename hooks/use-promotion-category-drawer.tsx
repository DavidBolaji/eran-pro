"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const usePromotionCategoryDrawer = () => {
  const queryClient = useQueryClient();


  if (!queryClient.getQueryData(["PROMOTION_CATEGORY_DRAWER"])) {
    queryClient.setQueryData(["PROMOTION_CATEGORY_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["PROMOTION_CATEGORY_DRAWER"], () => isOpen);
  };

  const { data: categoryDrawer } = useQuery({
    queryKey: ["PROMOTION_CATEGORY_DRAWER"],
    queryFn: () => queryClient.getQueryData(["PROMOTION_CATEGORY_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, categoryDrawer };
};
