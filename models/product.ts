import mongoose, { Schema, Document } from "mongoose";

export interface StockBySize {
  size: number;
  quantity: number;
}

const stockBySizeSchema = new Schema({
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Product extends Document {
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
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//product schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    art: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    costPrice: { type: Number, required: true },
    mrp: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    stockBySize: { type: [stockBySizeSchema], required: true },
    tags: { type: [String], required: false },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
