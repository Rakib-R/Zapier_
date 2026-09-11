import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { workflowsRouter } from "@/app/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({ name: "execute-ai" });
    return { success: true, data: "Ai executed!" };
  }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    console.log({ userId: ctx.auth.user.id });
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),

  getWork: protectedProcedure.query(async ({ ctx }) => {
    const data = prisma.workflow.findFirst({
      where: {
        id: ctx.userId,
      },
    });
    return {
      success: true,
      data,
      meta: {
        fetchedAt: new Date().toISOString(),
        environment: "local_dev",
      },
    };
  }),

  changeWork: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { ids } = await inngest.send({
      name: "Inngest_Checker",
      data: {
        Testing_Value: "Creating New Workflow",
        userId: ctx.userId,
      },
    });
    return { success: true, changeWork_eventId: ids[0] };
  }),
});
export type AppRouter = typeof appRouter;
