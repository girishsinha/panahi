import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// ─────────────────────────────────────────
// Step 1 — Extract filters from user query
// ─────────────────────────────────────────
async function extractFilters(userQuery: string) {
  const response = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content: `You are a filter extractor for a footwears catalog search.
Extract filter values from the user query and return ONLY a JSON object.

Possible filters:
- brand: string (e.g. "nike", "adidas", "puma")
- gender: "male" | "female" | "unisex"
- color: string (e.g. "white", "black", "red")
- category: string (e.g. "sports", "sneakers", "casual")
- maxPrice: number
- minPrice: number

Rules:
- Only include filters that are clearly mentioned in the query
- Return empty object {} if no filters found
- Return ONLY valid JSON, no explanation, no markdown`,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
  });

  try {
    const text = response.choices[0].message.content || "{}";

    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return {}; // if parsing fails return no filters
  }
}

// ─────────────────────────────────────────
// Step 2 — Embed the user query
// ─────────────────────────────────────────
async function embedQuery(userQuery: string) {
  const response = await client.embeddings.create({
    model: "gemini-embedding-001",
    input: userQuery,
  });

  return response.data[0].embedding;
}

// ─────────────────────────────────────────
// Step 3 — Vector search with filters
// ─────────────────────────────────────────
async function vectorSearch(queryVector: number[], filters: any) {
  const { default: dbConnect } = await import("@/lib/dbConnect");
  const { default: ProductModel } = await import("@/models/product");

  await dbConnect();

  // Build filter object for Atlas vector search
  const filterQuery: any = {};

  if (filters.brand) filterQuery.brand = filters.brand.toLowerCase();
  if (filters.gender) filterQuery.gender = filters.gender.toLowerCase();
  if (filters.color) filterQuery.color = filters.color.toLowerCase();
  if (filters.category) filterQuery.category = filters.category.toLowerCase();
  if (filters.maxPrice || filters.minPrice) {
    filterQuery.salePrice = {};
    if (filters.minPrice) filterQuery.salePrice.$gte = filters.minPrice;
    if (filters.maxPrice) filterQuery.salePrice.$lte = filters.maxPrice;
  }

  const pipeline: any[] = [
    {
      $vectorSearch: {
        index: "vectorIndexing", // 👈 your index name on Atlas
        path: "embedding",
        queryVector: queryVector,
        numCandidates: 200,
        limit: 3,
        ...(Object.keys(filterQuery).length > 0 && { filter: filterQuery }),
      },
    },
    {
      $project: {
        embedding: 0, // exclude embedding from results
        costPrice: 0, // exclude costPrice
        __v: 0,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ];

  return await ProductModel.aggregate(pipeline);
}

// ─────────────────────────────────────────
// Step 4 — Generate AI answer
// ─────────────────────────────────────────
async function generateAnswer(userQuery: string, products: any[]) {
  const productContext = products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} by ${p.brand} — ${p.color}, ${p.gender}, ${p.category} — Price: ₹${p.salePrice} — ${p.description}`,
    )
    .join("\n");

  const response = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content: `You are a helpful and friendly footwear shopping assistant.
Answer the user's query based on the products provided.
Be concise, helpful and natural. 
If no products found, suggest they try a different search.
Do not make up products that are not in the list.`,
      },
      {
        role: "user",
        content: `User query: "${userQuery}"
        
Available products:
${productContext}`,
      },
    ],
  });

  return response.choices[0].message;
}

// ─────────────────────────────────────────
// Main RAG function — call this from API
// ─────────────────────────────────────────
export async function ragSearch(userQuery: string) {
  try {
    // Run filter extraction and query embedding in parallelque

    const [filters, queryVector] = await Promise.all([
      extractFilters(userQuery),
      embedQuery(userQuery),
    ]);
    // const filters = await extractFilters(userQuery);

    // const queryVector = await embedQuery(userQuery);

    // Vector search with filters
    const products = await vectorSearch(queryVector, filters);

    // Generate AI answer
    const answer = await generateAnswer(userQuery, products);

    return {
      success: true,
      answer,
      products,
      filters, // useful for debugging
    };
  } catch (error: any) {
    console.error("RAG search failed:", error.message);
    return {
      success: false,
      answer: "Sorry, I couldn't process your request. Please try again.",
      products: [],
    };
  }
}
