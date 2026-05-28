import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams;
  const category = query.get("category");
  try {
    dbConnect();
    let products;
    if (category === "all") {
      products = await ProductModel.find({});
    } else {
      // console.log(category);
      // products = await ProductModel.find({ category });
    }
    return Response.json(
      { success: true, products, message: "All product route working" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error fetching products", details: String(err) },
      { status: 500 },
    );
  }
}
