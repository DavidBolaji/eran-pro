"use client"
import { useQuery } from "@tanstack/react-query";

import { getPromotions } from "@/actions/get-promotions";

export const usePromotions = () => {
  const { data: promotionList } = useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => await getPromotions(),
  });

  const promotions = Array.from(
    new Map(promotionList?.map((el) => [el.name, el])).values()
  ).map((promo) => ({
    key: promo.name,
    value: promo.id,
    label: promo.name,
  }));
  return { promotions };
};
