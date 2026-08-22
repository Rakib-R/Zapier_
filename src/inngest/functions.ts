import { prisma } from "@/lib/db";
import { inngest } from "./client";

export const inngest_test = inngest.createFunction(
  { id: "03#455$" },
  { event: "Inngest_Checker" },

  async ({ event, step }) => {
    await step.sleep("wait-a-moment-1", "2s");
    await step.sleep("wait-a-moment-1", "1s");
    await step.sleep("wait-a-moment-1", "1s");

    await step.run("create-workflow", async () => {
      return prisma.workflow.create({
        data: {
          name: `Workflow for ${event.data.email}`,
        },
      });
    });
  },
);
