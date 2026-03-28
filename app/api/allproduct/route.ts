import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product";

export async function GET() {
  try {
    dbConnect();
    const products = await ProductModel.find({});
    return Response.json(
      { success: true, products, message: "All product route working" },
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
