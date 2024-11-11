"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAxios } from "./use-axios";
import { useNotification } from "./use-notification";
import { useSignIn, useSignUp, useSession } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useLoginModal } from "./use-login-modal";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { close } = useLoginModal();
  const Axios = useAxios();

  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { isSignedIn, session } = useSession();

  const { toggleNotification } = useNotification();

  const { data: user, error } = useQuery({
    queryKey: ["USER"],
    queryFn: async () => {
      const req = await Axios.get("/user");
      return req.data?.user ?? null;
    },
    staleTime: Infinity,
  });

  const logout = async () => {
    if (isSignedIn) await session.end();
    if (isLoggedIn()) await Axios.get("/user/logout");

    queryClient.setQueryData(["USER"], null);
    toggleNotification({
      show: true,
      type: "success",
      title: "Logout Success",
      message: "Logout process is successful",
    });
  };

  console.log("[SESSION]", session);

  const { mutate: login } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async () => {
      const req = await Axios.post("/user/login");
      return req.data.user;
    },
    onSuccess(data: User) {
      queryClient.setQueryData(["USER"], data);
    },
    onError: (error) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Login Error",
        message:
          (error as AxiosError<{ error: string }>)?.response?.data?.error ??
          "Something went wrong",
      });
    },
  });

  const { mutate: createOrRegister } = useMutation({
    mutationKey: ["GOOGLE_LOGIN"],
    mutationFn: async (data: unknown) => {
      const req = await Axios.post("/user/google", data);
      return req.data.user;
    },
    onSuccess(data: User) {
      queryClient.setQueryData(["USER"], data);
    },
  });

  const googleLogin = async () => {
    if (!isSignedIn) {
      queryClient.setQueryData(["GOOGLE_ACTION"], "login");
      try {
        await signIn?.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/",
          redirectUrlComplete: "/",
        });
        close();
      } catch (error) {
        handleAuthError(
          error,
          "Google Sign-In Error",
          "Failed to authenticate with Google."
        );
      }
    }
  };

  const googleSignUP = async () => {
    queryClient.setQueryData(["GOOGLE_ACTION"], "signup");
    try {
      signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
      close();
    } catch (error) {
      handleAuthError(
        error,
        "Google Sign-Up Error",
        "Failed to authenticate with Google."
      );
    }
  };

  const isLoggedIn = () =>
    queryClient.getQueryData(["USER"]) !== null || isSignedIn;

  const handleAuthError = (error: unknown, title: string, message: string) => {
    console.error("Authentication Error:", error);
    toggleNotification({
      show: true,
      type: "error",
      title,
      message,
    });
  };

  useEffect(() => {
    // Check if session is still null after redirection and based on clicked action
    if (isSignedIn && session) {
      createOrRegister(session.publicUserData);
    }

    // After redirect back from Google, check if the session is still null
    const googleAction = queryClient.getQueryData(["GOOGLE_ACTION"]);

    if (googleAction && !session) {
      const t = setTimeout(() => {
        toggleNotification({
          show: true,
          type: "error",
          title:
            googleAction === "login"
              ? "Google Login Failed"
              : "Google Sign-Up Failed",
          message:
            googleAction === "login"
              ? "You most likely do not have an account try creating account instead."
              : "You most likely have an account try signing in instead.",
        });
        clearTimeout(t);
        queryClient.setQueryData(["GOOGLE_ACTION"], null);
      }, 3000);
    }
  }, [isSignedIn, session, createOrRegister, queryClient, toggleNotification]);

  if (error instanceof AxiosError && error.response?.status === 401) {
    logout();
  }

  return { user, logout, login, isLoggedIn, googleLogin, googleSignUP };
};
