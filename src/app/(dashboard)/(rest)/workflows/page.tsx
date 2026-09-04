import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth();

  return <main>WorkFlows</main>;
};

export default Page;
