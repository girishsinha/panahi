import mongoose, { Schema, Document } from "mongoose";

export interface StockBySize {
  size: number;
  quantity: number;
}

export interface Product extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  art: string;
  type: string;
  gender: "male" | "female";
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
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const stockBySizeSchema = new Schema({
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

//product schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    art: { type: String, required: true },
    type: { type: String, required: true },
    gender: { type: String, required: false },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: false },
    costPrice: { type: Number, required: true },
    mrp: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    stockBySize: { type: [stockBySizeSchema], required: true },
    tags: { type: [String], required: false },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);
const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
