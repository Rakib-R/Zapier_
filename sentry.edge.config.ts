// Import with `import * as Sentry from "@sentry/nextjs"` if you are using ESM
const Sentry = require("@sentry/nextjs");

Sentry.init({
  dsn: "https://e816e41ffb119f325403be8701a521f7@o4511546996293632.ingest.us.sentry.io/4512027855093760",

  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  tracesSampleRate: 1.0,
  dataCollection: {
    // Control data collection of LLMs and tools.
    // For more info visit: https://docs.sentry.io/platforms/javascript/data-management/data-collected/
    // genAI: { inputs: false, outputs: false },
  },
});
