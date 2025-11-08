// models/Sale.ts
import mongoose, { Schema, model, models } from 'mongoose';
import { Types } from 'mongoose';

export interface SoldItem {
  productId: Types.ObjectId;
  size: number;
  quantity: number;
  priceAtSale: number;
}

export interface Sale {
  _id: Types.ObjectId;
  items: SoldItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'upi' | 'wallet';
  customerName?: string;
  discount?: number;
  status: 'completed' | 'cancelled' | 'refunded';
  createdAt: Date;
}


const soldItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
  priceAtSale: { type: Number, required: true },
});

const saleSchema = new Schema(
  {
    items: { type: [soldItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'upi', 'wallet'],
      required: true,
    },
    customerName: { type: String },
    discount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['completed', 'cancelled', 'refunded'],
      default: 'completed',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Sale = models.Sale || model('Sale', saleSchema);
export default Sale;