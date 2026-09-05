import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{ executionId: string }>;
}

export default async function page({ params }: PageProps) {
  await requireAuth();

  const { executionId } = await params;
  return <div>ExecutionId -ID {executionId}</div>;
}
