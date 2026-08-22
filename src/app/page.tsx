import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();
  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4 items-center justify-center bg-background">
      <Button></Button>
    </div>
  );
}
