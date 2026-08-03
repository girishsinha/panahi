import OpenAI from "openai";
import { ProductInput } from "@/app/api/addProduct/route";

// Using OpenAI SDK pointed to Gemini endpoint
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,

  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Build rich text from product fields for embedding
function buildProductText(product: ProductInput) {
  const tags = product.tags?.join(", ") || "";

  return `
    ${product.name}
    ${product.description}
    Brand: ${product.brand}
    Type:${product.type}
    Category: ${product.category}
    Gender: ${product.gender}
    Color: ${product.color}
    Tags: ${tags}
    Price: ${product.salePrice}
  `.trim();
}

// Generate embedding vector for a product
export async function generateProductEmbedding(productData: ProductInput) {
  try {
    const text = buildProductText(productData);

    const response = await client.embeddings.create({
      model: "gemini-embedding-001",
      input: text,
    });
    // console.log("Full response:", JSON.stringify(response.data[0]));
    return response.data[0].embedding;
  } catch (error: any) {
    console.error("Embedding generation failed:", error.message);
    return null; // return null so product can still be saved without embedding
  }
}
