import { Icategories } from "@/components/form/add-category/types";
import { Axios } from "@/request/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./use-notification";


export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const {toggleNotification} = useNotification()

  const { mutate: createCategory, isPending, isSuccess } = useMutation({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (data: Icategories) =>
      await Axios.post("/category", data),
    onSuccess: () => {
      toggleNotification({
        show: true,
        title: "Category Created",
        type: "success",
        message:
          "New Category has been created succesfully",
      });
      queryClient.invalidateQueries({
        queryKey: ['CATEGORIES']
      })
     
    },
  });
  return { createCategory, isPending, isSuccess };
};
