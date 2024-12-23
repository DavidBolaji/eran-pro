"use client";

import { useUser } from "@/hooks/use-user";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const IsAuthAdmin: React.FC<{ admin?: boolean }> = ({ admin = false }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  
  useEffect(() => {
    if (admin) {
      if(!loading){
        if(!user?.id) return router.push("/");
        if (user?.role === "USER") return router.push("/dashboard");
      } 
      
    }
  }, [admin, loading, user]);
  
  if(loading) return null;
  return null;
};
