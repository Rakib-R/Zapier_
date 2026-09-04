import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

export default async function page({ params }: PageProps) {
  await requireAuth();
  const { workflowId } = await params;
  return <div>WorkflowId -ID {workflowId}</div>;
}
