"use client";

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import useSuspenseWorkflows, {
  useCreateWorkflow,
} from "../hooks/user-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function WorkflowsLists() {
  const workflows = useSuspenseWorkflows();
  return (
    <div className="flex flex-1 justify-center items-center">
      {JSON.stringify(workflows.data, null, 2)}
    </div>
  );
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();

  const { handleError, modal } = useUpgradeModal();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
        toast.success("Created!");
      },
      onError: (err) => {
        handleError(err);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflow"
        newButtonLabel="New Workflow"
        onNew={handleCreate}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
}

interface WorkflowsContainerProps {
  children: React.ReactNode;
}

export const WorkflowsContainer = ({ children }: WorkflowsContainerProps) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
