"use client";

import { FC, PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ReactQueryClientWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
