import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/app/features/editor/components/editor";
import EditorHeader from "@/app/features/editor/components/editor-header";

import { prefetchWorkflow } from "@/app/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

export default async function page({ params }: PageProps) {
  await requireAuth();
  const { workflowId } = await params;

  try {
    await prefetchWorkflow(workflowId);
  } catch (error) {
    notFound();
  }

  await prefetchWorkflow(workflowId);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1 px-4">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
