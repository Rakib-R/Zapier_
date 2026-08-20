<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();
  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4 items-center justify-center bg-background">
      Protected Server{" "}
    </div>
  );
=======
import Image from "next/image";

export default function Home() {
  return <main className="font-sans">Just for testing purposes</main>;
>>>>>>> origin/testing
}
