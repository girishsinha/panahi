import { AgentResult } from "@/lib/aiLibrary/mainAgent";
import { ragSearch } from "@/lib/aiLibrary/retrievalService"; //this returns the answer from the vector database
import { error } from "console";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }
    // console.log(query);

    const result = await AgentResult(query);
    return Response.json(
      {
        success: true,
        answer: result.answer,
        products: result.products,
      },
      { status: 200 },
    );
  } catch (err) {
    error(err);
    return Response.json(
      { error: "Search failed", details: String(err) },
      { status: 500 },
    );
  }
}
