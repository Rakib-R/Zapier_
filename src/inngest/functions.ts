import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();

export const execute_Gemini = inngest.createFunction(
  {
    id: "Execute $ AI",
    triggers: [{ event: "execute-ai" }],
  },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini_Run",
      generateText,
      {
        model: google("gemini-3.6-flash"),
        system: " You are a very nice - Entity !",
        prompt: " When will you conquer human?",
      },
    );

    const { steps: openAISteps } = await step.ai.wrap(
      "openAI_Run",
      generateText,
      {
        model: openai("openai/gpt-3.5-turbo"),
        system: " You are a very nice - Entity !",
        prompt: " You will diminish Capitalism???",
      },
    );
    return {
      geminiSteps,
      openAISteps,
    };
  },
);
