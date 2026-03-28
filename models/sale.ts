// models/Sale.ts
import mongoose, { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface SoldItem {
  productId: Types.ObjectId;
  name: string;
  size: number;
  quantity: number;
  costPrice: number;
  finalPrice: number;
}

export interface Sale {
  soldItems: SoldItem[];
  totalAmount: number;
  paymentMethod: "cash" | "card" | "upi" | "wallet";
  customerName?: string;
  discount?: number;
  status: "completed" | "cancelled" | "refunded";
  createdAt: Date;
}

const soldItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  priceAtSale: { type: Number, required: true },
});

const saleSchema = new Schema(
  {
    soldItems: { type: [soldItemSchema], required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "upi"],
      required: true,
    },
    totalAmount: { type: Number, required: true },
    customerName: { type: String },
    discount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Sale = models.Sale || model("Sale", saleSchema);
export default Sale;
