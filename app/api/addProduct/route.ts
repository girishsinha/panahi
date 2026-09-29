import { generateProductEmbedding } from "@/lib/aiLibrary/embeddingService";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { saveImage } from "@/lib/imageHandlar";
import ProductModel from "@/models/product";
// types forProduct.ts
interface StockBySize {
  size: number;
  quantity: number;
}

export interface ProductInput {
  name: string;
  art: string;
  brand: string;
  category: string;
  type: string;
  gender: "male" | "female" | "unisex";
  color: string;
  costPrice: number;
  mrp: number;
  salePrice: number;
  stockBySize: StockBySize[];
  imageUrl: string;
  description: string;
  tags?: string[];
  isAvailable?: boolean;
  embedding?: [Number];
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const contentType = req.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");
    const formData = isFormData ? await req.formData() : null;
    const body = !isFormData ? await req.json() : null;

    const getValue = (key: string) => {
      if (formData) return formData.get(key);
      return body?.[key];
    };

    const getString = (key: string) => {
      const value = getValue(key);
      return typeof value === "string" ? value : "";
    };

    const getNumber = (key: string) => {
      const value = getValue(key);
      return typeof value === "string" || typeof value === "number"
        ? Number(value)
        : NaN;
    };

    const rawStock = getValue("stockBySize");
    const stockBySize: StockBySize[] = rawStock
      ? typeof rawStock === "string"
        ? JSON.parse(rawStock)
        : Array.isArray(rawStock)
          ? rawStock
          : []
      : [];

    let imageUrl = "";
    if (formData) {
      const image = formData.get("image");
      if (!image) {
        return Response.json({ error: "Image is required" }, { status: 400 });
      }
      const imagePath = await saveImage(image as File);
      const uploadResult = await uploadOnCloudinary(imagePath);
      if (!uploadResult) {
        return Response.json({ error: "Image upload failed" }, { status: 500 });
      }
      imageUrl = uploadResult.url;
    } else {
      if (typeof body?.imageUrl === "string" && body.imageUrl.trim()) {
        imageUrl = body.imageUrl;
      } else {
        return Response.json(
          { error: "Image URL is required for JSON requests" },
          { status: 400 },
        );
      }
    }

    const newProductData: ProductInput = {
      name: getString("name"),
      art: getString("art"),
      brand: getString("brand"),
      category: getString("category"),
      type: getString("type"),
      gender: getString("gender") as "male" | "female" | "unisex",
      color: getString("color"),
      costPrice: getNumber("costPrice"),
      mrp: getNumber("mrp"),
      salePrice: getNumber("salePrice"),
      stockBySize,
      imageUrl,
      description: getString("description"),
      tags: (() => {
        const tagsValue = getValue("tags");
        if (Array.isArray(tagsValue)) return tagsValue as string[];
        if (typeof tagsValue === "string" && tagsValue.trim()) {
          try {
            return JSON.parse(tagsValue) as string[];
          } catch {
            return [];
          }
        }
        return [];
      })(),
    };
    const embedding = await generateProductEmbedding(newProductData);
    const payload = { ...newProductData, embedding: embedding };
    // console.log(payload);
    const addedProduct = await ProductModel.create(payload);

    const saved = await ProductModel.findById(addedProduct._id)
      .select("embedding")
      .lean();

    console.log("Embedding saved length:", saved?.embedding?.length);
    if (!addedProduct) {
      return Response.json(
        { error: "Product creation failed" },
        { status: 500 },
      );
    }
    return Response.json(
      {
        success: true,
        addedProduct,
        message: "Product added successfully.",
      },
      { status: 201 },
    );
  } catch (err) {
    // console.log(err);
    return Response.json(
      { error: "server error", details: String(err) },
      { status: 500 },
    );
  }
}
