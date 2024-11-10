"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAxios } from "./use-axios";
import { useNotification } from "./use-notification";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { toggleNotification } = useNotification();
  const Axios = useAxios();

  if (!queryClient.getQueryData(["USER"])) {
    queryClient.setQueryData(["USER"], null);
  }

  const logout = () => {
    queryClient.setQueryData(["USER"], () => null);
    toggleNotification({
      show: true,
      type: "success",
      title: "Logout Success",
      message: "Logout process is successfull",
    });
  };

  const { data: user, error } = useQuery({
    queryKey: ["USER"],
    queryFn: async () => {
      const req = await Axios.get("/user");
      return req.data?.user ?? null;
    },
    staleTime: Infinity,
  });

  const {
    mutate: login,
    isError: isLoginError,
    error: loginError,
  } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async () => {
      const req = await Axios.post("/user/login");
      return req.data.user;
    },
  });

  const isLoggedIn = () => {
    const user = queryClient.getQueryData(["USER"])
    return user !== null
  };

  console.log("[LOGIN_ERROR]", (error as AxiosError)?.response?.status);

  if ((error as AxiosError)?.response?.status === 401) {
    logout();
  }

  if (isLoginError) {
    toggleNotification({
      show: true,
      type: "error",
      title: "Login Error",
      message:
        (loginError as AxiosError<{ error: string }>)?.response?.data?.error ??
        "Something went Wrong",
    });
  }

  return { user, logout, login, isLoggedIn };
};
