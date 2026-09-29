import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams;
  try {
    dbConnect();
    let products;
    const gender = query.get("gender");
    const type = query.get("type");
    const category = query.get("category");
    const color = query.get("color");
    const priceMin = query.get("priceMin");
    const priceMax = query.get("priceMax");
    const size = query.get("size");
    const filter: Record<string, unknown> = {};

    // Gender filter
    if (gender) {
      const lowerGender = gender.toLowerCase();
      if (lowerGender === "male" || lowerGender === "female") {
        filter.gender = { $in: [lowerGender, "unisex"] };
      } else {
        filter.gender = gender;
      }
    }

    // Type filter
    if (type) {
      filter.type = type;
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Color filter
    if (color) {
      filter.color = color;
    }

    // Price range filter
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) {
        (filter.price as Record<string, number>).$gte = Number(priceMin);
      }
      if (priceMax) {
        (filter.price as Record<string, number>).$lte = Number(priceMax);
      }
    }

    // Size filter
    if (size) {
      filter.stockBySize = { $elemMatch: { size: size } };
    }

    products = await ProductModel.find(filter).select("-embedding -costPrice");
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
