import { Agent, run, tool, setDefaultOpenAIClient } from "@openai/agents";
import { OpenAI } from "openai";
import { z } from "zod";

setDefaultOpenAIClient(
  new OpenAI({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
  }),
);

const historyFunFact = tool({
  name: "history_fun_fact",
  description: "Return a short history fact.",
  parameters: z.object({}),
  async execute() {
    return "Sharks are older than trees.";
  },
});

const agent = new Agent({
  name: "History tutor",
  instructions:
    "Answer history questions clearly. Use history_fun_fact when it helps.",
  model: "gemini-2.5-flash",
  tools: [historyFunFact],
});

const result = await run(
  agent,
  "Tell me something surprising about ancient life on Earth.",
);

console.log(result.finalOutput);
