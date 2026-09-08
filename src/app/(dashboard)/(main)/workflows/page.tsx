import { requireAuth } from "@/lib/auth-utils";
import { prefetchWorkflows } from "@/app/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import WorkflowsLists from "../../../features/workflows/components/workflows";
import { WorkflowsContainer } from "../../../features/workflows/components/workflows";

const Page = async () => {
  await requireAuth();

  prefetchWorkflows();
  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={"WAit, I Have Error Boundary!"}>
          <Suspense fallback={"Loading !!!"}>
            <WorkflowsLists />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
