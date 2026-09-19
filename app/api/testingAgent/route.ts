import { AgentResult } from "@/lib/aiLibrary/mainAgent";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

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
    console.error(err);
    return Response.json(
      { error: "Testing is failed", details: String(err) },
      { status: 500 },
    );
  }
}
