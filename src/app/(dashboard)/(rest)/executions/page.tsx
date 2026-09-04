import { requireAuth } from "@/lib/auth-utils";
import React from "react";

export default async function page() {
  await requireAuth();

  return <div>Executions</div>;
}
