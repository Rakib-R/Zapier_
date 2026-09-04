import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{ credentialId: string }>;
}

export default async function page({ params }: PageProps) {
  await requireAuth();

  const { credentialId } = await params;
  return <div>Credentials -ID {credentialId}</div>;
}
