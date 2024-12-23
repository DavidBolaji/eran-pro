import { Icategories } from "@/components/form/add-category/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./use-notification";
import { useAxios } from "./use-axios";


export const useAddBlogCategory = () => {
  const queryClient = useQueryClient();
  const {toggleNotification} = useNotification()
  const Axios = useAxios()

  const { mutate: createBlogCategory, isPending, isSuccess } = useMutation({
    mutationKey: ["CREATE_BLOG_CATEGORY"],
    mutationFn: async (data: Icategories) =>
      await Axios.post("/blog-category", data),
    onSuccess: () => {
      toggleNotification({
        show: true,
        title: "Category Created",
        type: "success",
        message:
          "New Category has been created succesfully",
      });
      queryClient.invalidateQueries({
        queryKey: ['BLOG_CATEGORIES']
      })
     
    },
  });
  return { createBlogCategory, isPending, isSuccess };
};
