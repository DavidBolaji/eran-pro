"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { useAxios } from "./use-axios";
import { useNotification } from "./use-notification";
import { Address, Image, Product, User, Notifications } from "@prisma/client";
import { useLoginModal } from "./use-login-modal";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/actions/get-customers";
import usePwa from "./use-pwa";


export type UserType = Omit<
  User,
  "password" | "createdAt" | "updatedAt" | "status"
> & {
  orders: ({ products: Pick<Product, "name" | "price"> } & {
    images: Image[];
  })[];
  orderAddress: Address[];
  Notifications: Notifications[]
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const Axios = useAxios();
  const { toggleNotification } = useNotification();
  const {showNotification} = usePwa()
  const { toggleModal } = useLoginModal();
  const router = usePathname();
  const route = useRouter();

  // Fetch user data
  const {
    data: user,
    error,
    refetch,
  } = useQuery<UserType | null>({
    queryKey: ["USER"],
    queryFn: async () => {
      const response = await Axios.get("/user");
      return response.data?.user ?? null;
    },
    staleTime: 2000,
    retry: false
  });

  // Debounce refetch to avoid excessive calls
  const debouncedRefetch = useMemo(
    () => debounce(() => refetch(), 1000),
    [refetch]
  );

  useEffect(() => {
    if (user && user?.role === "ADMIN" && router === "/dashboard") {
      route.push("/dashboard/home");
    }
  }, [user, router, route]);

  // Logout functionality
  const logout = useCallback(
    async (showNotification = true) => {
      try {
        // if (isSignedIn) await session.end();
        await Axios.post("/user/logout");
        queryClient.setQueryData(["USER"], null);
        debouncedRefetch(); // Use debounced version

        if (showNotification) {
          toggleNotification({
            show: true,
            type: "success",
            title: "Logout Success",
            message: "Logout process is successful",
          });
        }
      } catch (error) {
        console.error("Logout Error:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient, debouncedRefetch, toggleNotification]
  );

  // Handle login with email/password
  const login = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Axios.post("/user/login", data);
      return response.data.user as UserType;
    },
    onSuccess: () => {
      debouncedRefetch(); // Use debounced version
      toggleNotification({
        show: true,
        type: "success",
        title: "Login Successful",
        message: "User has successfully logged in",
      });
     
       showNotification()
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Login Error",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
    onSettled: () => toggleModal(false, "LOGIN_MODAL"),
  });


  // Handle login with email/password
  const adminLogin = useMutation({
    mutationKey: ["ADMIN_LOGIN"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Axios.post("/user/login/admin", data);
      return response.data.user;
    },
    onSuccess: async () => {

      toggleNotification({
        show: true,
        type: "success",
        title: "Login Successful",
        message: "User has successfully logged in",
      });
      // await new Promise(resolve => setTimeout(resolve, 1000))
      await debouncedRefetch(); // Use debounced version

    },
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Login Error",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  // Handle registration
  const register = useMutation({
    mutationKey: ["REGISTER"],
    mutationFn: async (data: unknown) => {
      const response = await Axios.post("/user", data);
      return response.data.user;
    },
    onSuccess: () => {
      debouncedRefetch()
      showNotification()

    }, // Use debounced version
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Registration Error",
        message: error?.response?.data?.message || "Something went wrong",
      });
    },
    onSettled: () => toggleModal(false, "LOGIN_MODAL"),
  });

  // Handle update
  const update = useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (data: IUser) => {
      const response = await Axios.patch("/user", data);
      return response.data;
    },
    onSuccess: () => {
      debouncedRefetch(); // Use debounced version
      toggleNotification({
        show: true,
        type: "success",
        title: "Update Successful",
        message: "User has been successfully updated",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Update Error",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  const loading =
    login.isPending ||
    register.isPending ||
    update.isPending ||
    // createOrRegister.isPending ||
    adminLogin.isPending;

  // useEffect(() => {
  //   if (isSignedIn) {
  //     createOrRegister.mutate(session.publicUserData);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSignedIn]);

  // Refetch user data on route change with debounce
  useEffect(() => {
    debouncedRefetch();
    return () => {
      debouncedRefetch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Auto logout on 401 error
  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      // logout(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const isLoggedIn = useCallback(
    () => queryClient.getQueryData(["USER"]) !== null,
    [queryClient]
  );

  return {
    user,
    logout,
    login: login.mutate,
    register: register.mutate,
    adminLogin: adminLogin.mutate,
    update: update.mutate,
    isLoggedIn,
    // googleLogin: () => handleGoogleAuth("login"),
    // googleSignUP: () => handleGoogleAuth("signup"),
    loading
  };
};
