"use client";
import React, { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import {
  PersistQueryClientProvider,
  persistQueryClient,
} from "@tanstack/react-query-persist-client";

// Initialize QueryClient with desired default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

// Custom persister to handle cache persistence in localStorage
const customPersister = {
  persistClient: async (client: any) => {
    window.localStorage.setItem("react-query-cache", JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = window.localStorage.getItem("react-query-cache");
    return cache ? JSON.parse(cache) : undefined;
  },
  removeClient: async () => {
    window.localStorage.removeItem("react-query-cache");
  },
};

// Set up persisting the cache on application startup
persistQueryClient({
  queryClient,
  persister: customPersister,
  // maxAge: 1000 * 60 * 60 * 24, // Cache maximum age set to 1 day
});

// TanstackProvider Component
export const TanstackProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [client] = useState(queryClient);

  return (
    <PersistQueryClientProvider client={client} persistOptions={{ persister: customPersister }}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </PersistQueryClientProvider>
  );
};
