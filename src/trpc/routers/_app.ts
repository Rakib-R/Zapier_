import { z } from "zod";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(async (opts) => {
    const users = await prisma.user.findMany();
    return users;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
