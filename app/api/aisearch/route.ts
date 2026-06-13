import { ragSearch } from "@/lib/aiLibrary/retrievalService";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }
    // console.log(query);
    const result = await ragSearch(query);

    return Response.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
