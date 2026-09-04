import { appRouter } from "@/trpc/routers/_app";
import { requireAuth } from "@/lib/auth-utils";
import Action_Button from "@/utils/action_button";

export default async function Page() {
  const session = await requireAuth();

  // Define a Server Action function
  async function triggerChangeWork() {
    "use server";
    const caller = appRouter.createCaller({
      userId: session?.user.id,
    });
    const work = await caller.changeWork();
    return {
      success: true,
      message: "Work Created successfully!",
      data: work,
    };
  }

  async function triggerTestAI() {
    "use server";
    const caller = appRouter.createCaller({
      userId: session?.user.id,
    });
    try {
      // 2. Call the mutation directly like a normal function
      const story = await caller.testAI();
      console.log("Generated Story:", story);
      return {
        success: true,
        message: "Story generated successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message: "!! Story Generation Failed !!",
      };
    }
  }
  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4 items-center justify-center bg-background">
      {/* Forms trigger actions automatically without needing onClick handlers */}
      <Action_Button
        triggerTestAI={triggerTestAI}
        triggerChangeWork={triggerChangeWork}
      />
    </div>
  );
}
