import {
  Agent,
  Runner,
  setTracingDisabled,
  tool,
  OpenAIProvider,
  setDefaultOpenAIClient,
  setOpenAIAPI,
  setDefaultOpenAIKey,
} from "@openai/agents";
import { OpenAI } from "openai";
import { ragSearch } from "@/lib/aiLibrary/retrievalService"; //this returns the answer from the vector database
import { z } from "zod";

// dotenv.config();

// Create a custom OpenAI client and provider
const openaiClient = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.BASE_URL,
});
const modelProvider = new OpenAIProvider({
  openAIClient: openaiClient,
});
setDefaultOpenAIClient(openaiClient); // Pass the OpenAI client instance
setOpenAIAPI("chat_completions");
setTracingDisabled(true);

export const AgentResult = async (query: string) => {
  const capturedProducts: any[] = [];

  const findProductTool = tool({
    name: "find_products",
    description:
      "Search the footwear catalog. Extract structured filters from the user's request when mentioned, and rewrite the remaining intent as a clean semantic description (use-case, style, comfort, material, occasion, price, gender, brand,color) for vector search.",
    parameters: z.object({
      semanticQuery: z
        .string()
        .describe(
          "A cleaned, descriptive phrase capturing style/use-case/vibe only — e.g. 'lightweight breathable running shoes for daily jogging'.",
        ),
    }),
    async execute(userQuery) {
      const results = await ragSearch(userQuery.semanticQuery);

      // results = { matches, topScore, hasGoodMatch } per your retrievalService
      if (results.success) {
        capturedProducts.push(...results.products);
      }

      if (!results.success) {
        return JSON.stringify({
          noMatch: true,
          message: `No close matches found . Tell the user we don't currently stock exactly that, and ask if they'd like similar alternatives.`,
        });
      }

      return JSON.stringify({ noMatch: false, products: results.products });
    },
  });

  const agent = new Agent({
    name: "Assistant",
    instructions: `You are a helpful footwear shopping assistant, you help user to find a best pair of footwear for them bsed on their needs and preferences,and you can also provide information about the footwears brands, styles, materials, and other relevant details. You can also provide recommendations based on the user's preferences and needs,
       
       Shop details: name : OmFootwears, location : bus stand guruwar bazar road, anda, chhattisgarh, india, contact : +91 7879519788, owner name : Rajendra sinha (Raju),

       buying options: offline store only , online option is not available yet , so for best deals and offers, need visit the store in person,
      `,
    model: "gemini-2.5-flash",
    tools: [findProductTool],
  });
  const runner = new Runner({ modelProvider });
  const result = await runner.run(agent, query);
  // console.log(result.finalOutput);
  return { answer: result.finalOutput, products: capturedProducts };
};
