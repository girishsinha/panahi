import type { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/allproduct/[id]">,
) {
  try {
    dbConnect();

    const { id } = await ctx.params;

    const products = await ProductModel.find({ _id: id });
    return Response.json(
      { success: true, products, message: "dynamic route" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "Error fetching products", details: String(err) },
      { status: 500 },
    );
  }
}
