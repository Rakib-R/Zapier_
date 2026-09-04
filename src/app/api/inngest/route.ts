import { serve } from "inngest/next";
// Import your inngest client and functions here later
import { inngest } from "@/inngest/client";
import { execute_Gemini } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest, // Replace with your actual inngest client instance
  functions: [execute_Gemini],
});
