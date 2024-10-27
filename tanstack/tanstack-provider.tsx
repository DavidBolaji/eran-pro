"use client";
import React, { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const useStorage = () => {
  const [storage, setStorage] = useState<Storage | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStorage(window.localStorage);
    }
  }, []);

  return storage;
};

export const TanstackProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [client] = useState(queryClient);
    const storage = useStorage();
  
    const persister = createSyncStoragePersister({
      storage: storage,
    });
  
    return (
      <PersistQueryClientProvider client={client} persistOptions={{ persister }}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </PersistQueryClientProvider>
    );
  }