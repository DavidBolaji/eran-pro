"use client";

import { useNotification } from "@/hooks/use-notification";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";

export const IsAuth = () => {
  const { user } = useUser();
  const { toggleNotification } = useNotification();

  if (!user) {
    toggleNotification({
      title: "Not Authenticated",
      message: "Sign in to visit the orders page",
      show: true,
      type: "info",
    });
    redirect("/");
  }

  return null;
};
