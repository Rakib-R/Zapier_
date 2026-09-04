"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function StoryButton() {
  // pending will automatically switch to true when the form is submitted
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating Story..." : "Generate Story"}
    </Button>
  );
}
