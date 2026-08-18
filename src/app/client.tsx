"use client";

import {
  dehydrate,
  HydrationBoundary,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface ClientProps {
  users: any; // Ideally replace 'any' with your Prisma User type (e.g., User[])
}

export default function Client({ users: initialUsers }: ClientProps) {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return <main>{JSON.stringify(users)}</main>;
}
