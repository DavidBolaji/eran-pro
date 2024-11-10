"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useLoginModal = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["LOGIN_MODAL"])) {
    queryClient.setQueryData(["LOGIN_MODAL"], {
      shown: true,
      key: "LOGIN_MODAL",
    });
  }

  const toggleModal = (
    isOpen: boolean,
    key: "LOGIN_MODAL" | "REGISTER_MODAL"
  ) => {
    queryClient.setQueryData(["LOGIN_MODAL"], () => ({
      shown: isOpen,
      key,
    }));
  };

  const { data: loginModal } = useQuery({
    queryKey: ["LOGIN_MODAL"],
    queryFn: () =>
      queryClient.getQueryData(["LOGIN_MODAL"]) as {
        shown: boolean;
        key: "LOGIN_MODAL" | "REGISTER_MODAL";
      },
    staleTime: Infinity,
  });
  return { toggleModal, loginModal };
};
