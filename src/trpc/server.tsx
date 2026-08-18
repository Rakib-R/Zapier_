import "server-only";

import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { createTRPCContext } from "./init"; // Adjust this path to where your context function lives

// 1. Create a stable getter for the query client
export const getQueryClient = cache(makeQueryClient);

// 2. Clear inline declarations and use your official context builder directly
export const trpc = createTRPCOptionsProxy({
  ctx: async () => {
    return createTRPCContext({
      headers: await headers(),
    });
  },
  router: appRouter,
  queryClient: getQueryClient,
});

// 3. Pass the exact same context builder to createCaller to satisfy TypeScript
export const caller = appRouter.createCaller(async () => {
  return createTRPCContext({
    headers: await headers(),
  });
});
