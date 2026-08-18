import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { caller } from "@/trpc/server";
import Client from "./client";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();
  const users = await caller.getUsers();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback=<>LOADING ....</>>
        <Client users={users} />
      </Suspense>
    </HydrationBoundary>
  );
}
