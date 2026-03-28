import { uploadOnCloudinary } from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { saveImage } from "@/lib/imageHandlar";
import ProductModel from "@/models/product";
// types forProduct.ts
export interface StockBySize {
  size: number;
  quantity: number;
}

export interface ProductInput {
  name: string;
  art: string;
  brand: string;
  category: string;
  color: string;
  costPrice: number;
  mrp: number;
  salePrice: number;
  stockBySize: StockBySize[];
  imageUrl: string;
  description: string;
  tags?: string[];
  isAvailable?: boolean;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();
    console.log(formData.get("name"));
    const image = formData.get("image");

    if (!image) {
      return Response.json({ error: "Image is required" }, { status: 400 });
    }
    const imagePath = await saveImage(image as File);

    //uploade image to cloudinary
    const uploadResult = await uploadOnCloudinary(imagePath);
    if (!uploadResult) {
      return Response.json({ error: "Image upload failed" }, { status: 500 });
    }
    // add new product
    const newProductData: ProductInput = {
      name: formData.get("name") as string,
      art: formData.get("art") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      color: formData.get("color") as string,
      costPrice: Number(formData.get("costPrice")) as number,
      mrp: Number(formData.get("mrp")) as number,
      salePrice: Number(formData.get("salePrice")) as number,
      stockBySize: JSON.parse(
        formData.get("stockBySize") as string,
      ) as StockBySize[],
      imageUrl: uploadResult.url,
      description: formData.get("description") as string,
      tags: (JSON.parse(formData.get("tags") as string) as string[]) || [],
    };
    // console.log(newProductData);
    const addedProduct = await ProductModel.create(newProductData);
    if (!addedProduct) {
      return Response.json(
        { error: "Product creation failed" },
        { status: 500 },
      );
    }
    console.log(addedProduct);
    return Response.json(
      {
        success: true,
        addedProduct,
        message: "Product added successfully.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "Invalid JSON or server error", details: String(err) },
      { status: 500 },
    );
  }
}
