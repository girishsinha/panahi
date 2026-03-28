import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product";
// types forProduct.ts

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { productId, size, quantity, finalPrice } = await req.json();
    if (!productId || !size || quantity === undefined) {
      return Response.json(
        { error: "productId, size, and quantity are required" },
        { status: 400 }
      );
    }
    console.log(productId, size, quantity, finalPrice);
    // Update specific size quantity
    const updatedProduct = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $inc: {
          "stockBySize.$[elem].quantity": -quantity,
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem.size": size }],
      }
    );

    if (!updatedProduct) {
      return Response.json(
        { message: "Product or size not found" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Sale route working" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "error while making sale", details: String(err) },
      { status: 500 }
    );
  }
}
