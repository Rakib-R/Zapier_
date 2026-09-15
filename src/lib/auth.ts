import { betterAuth } from "better-auth";
import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { polarClient } from "./polar";
import { haveIBeenPwned } from "better-auth/plugins";

export const auth = betterAuth({
  logger: {
    level: "debug",
  },
  plugins: [
    haveIBeenPwned({
      enabled: true, // Turns the database checks on or off
      customPasswordCompromisedMessage:
        "This password was found in a breach! Please use a different one.",
      paths: ["/sign-up/email", "/change-password"], // Custom endpoints to watch
    }),

    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      use: [
        checkout({
          products: [
            {
              productId: "YOUR_PRODUCT_ID", // ⚠️ must not be empty
              slug: "YOUR_SLUG", // ⚠️ must not be empty
            },
          ],
          successUrl: "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onCustomerStateChanged: async (payload) => {
            console.log("something onCustomerStateChanged");
          },
          onPayload: async (payload) => {
            console.log("On Payload");
          },
        }),
      ],
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  baseURL: process.env.BETTER_AUTH_URL,
});
