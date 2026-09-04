"use client";

import React from "react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { CommitWorkButton } from "./fake_work_button";
import { StoryButton } from "./fake_story_button";

type ActionResultType = { success: boolean; message: string } | null;
const ActionForm = ({
  action,
  children,
}: {
  action: () => Promise<ActionResultType>;
  children: React.ReactNode;
}) => {
  const [state, formAction, isPending] = useActionState<
    ActionResultType,
    FormData
  >(async (_prevState, _formData) => await action(), null);

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.error(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
};

export default function Action_Button({
  triggerChangeWork,
  triggerTestAI,
}: {
  triggerChangeWork: () => Promise<ActionResultType>;
  triggerTestAI: () => Promise<ActionResultType>;
}) {
  return (
    <>
      <ActionForm action={triggerChangeWork}>
        <CommitWorkButton />
      </ActionForm>

      <ActionForm action={triggerTestAI}>
        <StoryButton />
      </ActionForm>
    </>
  );
}
