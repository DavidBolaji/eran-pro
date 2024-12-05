"use client"

import { useNotification } from "@/hooks/use-notification";
import { useUser } from "@/hooks/use-user";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const IsAuth = () => {
  const { user } = useUser();
  const { toggleNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      toggleNotification({
        title: "Not Authenticated",
        message: "Sign in to visit the orders page",
        show: true,
        type: "info",
      });
    }
  }, [router, user, toggleNotification]);

  return null;
};
