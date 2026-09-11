import { requireAuth } from "@/lib/auth-utils";
import { prefetchWorkflows } from "@/app/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import WorkflowsLists, {
  WorkflowsError,
  WorkflowsLoading,
} from "../../../features/workflows/components/workflows";
import { WorkflowsContainer } from "../../../features/workflows/components/workflows";
import { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/app/features/workflows/server/params-loader";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);
  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsLists />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
