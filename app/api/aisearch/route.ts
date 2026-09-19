// import { ragSearch } from "@/lib/aiLibrary/retrievalService";
import { ragSearch } from "@/lib/aiLibrary/retrievalService"; //this returns the answer from the vector database
import { error } from "console";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }
    // console.log(query);
    const result = await ragSearch(query);
    if (!result.success) {
      console.log("from error", result);
      throw new Error(JSON.stringify(result.answer));
    }

    return Response.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Search failed", details: String(err) },
      { status: 500 },
    );
  }
}
