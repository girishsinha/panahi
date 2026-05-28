import type { Product } from "@/models/product";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const products = [
  {
    _id: "1" as any,
    name: "Slim Fit Shirt",
    art: "Shirt",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Tops",
    color: "Blue",
    costPrice: 25,
    mrp: 45,
    salePrice: 38,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1521120098177-3420786cae1b?auto=format&fit=crop&w=800&q=80",
    description: "Classic slim fit shirt for everyday wear",
    tags: ["shirt", "casual"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2" as any,
    name: "Denim Jacket",
    art: "Jacket",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Outerwear",
    color: "Blue",
    costPrice: 45,
    mrp: 79,
    salePrice: 65,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    description: "Timeless denim jacket for all seasons",
    tags: ["jacket", "denim"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3" as any,
    name: "Casual Chinos",
    art: "Pants",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Bottoms",
    color: "Khaki",
    costPrice: 30,
    mrp: 59,
    salePrice: 48,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable chinos for casual outings",
    tags: ["chinos", "pants"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4" as any,
    name: "Leather Sneakers",
    art: "Shoes",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Footwear",
    color: "White",
    costPrice: 55,
    mrp: 99,
    salePrice: 82,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1519741491600-3c4a2bf6cc7a?auto=format&fit=crop&w=800&q=80",
    description: "Premium leather sneakers for daily comfort",
    tags: ["sneakers", "shoes"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "5" as any,
    name: "Wool Coat",
    art: "Coat",
    type: "Formal",
    gender: "male",
    brand: "Premium",
    category: "Outerwear",
    color: "Black",
    costPrice: 70,
    mrp: 120,
    salePrice: 98,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    description: "Elegant wool coat for winter elegance",
    tags: ["coat", "wool"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "6" as any,
    name: "Graphic Tee",
    art: "T-Shirt",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Tops",
    color: "Black",
    costPrice: 12,
    mrp: 28,
    salePrice: 22,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    description: "Stylish graphic tee for casual wear",
    tags: ["tee", "graphic"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "7" as any,
    name: "Track Pants",
    art: "Pants",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Bottoms",
    color: "Gray",
    costPrice: 28,
    mrp: 55,
    salePrice: 45,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable track pants for relaxation",
    tags: ["pants", "track"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "8" as any,
    name: "Bomber Jacket",
    art: "Jacket",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Outerwear",
    color: "Navy",
    costPrice: 60,
    mrp: 110,
    salePrice: 90,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1495121605193-b116b5b9c5d3?auto=format&fit=crop&w=800&q=80",
    description: "Trendy bomber jacket for modern style",
    tags: ["jacket", "bomber"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "9" as any,
    name: "Knit Sweater",
    art: "Sweater",
    type: "Casual",
    gender: "male",
    brand: "Premium",
    category: "Tops",
    color: "Gray",
    costPrice: 35,
    mrp: 65,
    salePrice: 54,
    stockBySize: [],
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    description: "Cozy knit sweater for everyday comfort",
    tags: ["sweater", "knit"],
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function MensCollectionPage() {
  return (
    <main className="max-w-7xl  m-auto px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 mt-28">
          <div className="flex justify-between items-end mb-20">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
                Men&apos;s Collection
              </p>

              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.06em] mt-6 text-black">
                STYLISH PIECES
              </h2>
            </div>
          </div>
        </header>

        {/* <div className="grid justify-items-start bg-amber-100 grid-cols-3 w"> */}
        <div className="grid  w-fit gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product._id.toString()}
              className="relative mx-auto w-full max-w-sm pt-0 ring-0  rounded-none"
            >
              <div className="absolute inset-0 z-30 " />
              <img
                src={product.imageUrl}
                alt="Event cover"
                className="relative z-20 aspect-square  w-full object-cover"
              />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle>
                  {" "}
                  <span className="font-bold">{product.brand + " "}</span>
                  {product.name}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p className="flex gap-2 items-baseline font-bold">
                  ₹{product.salePrice}
                  <span className="line-through text-gray-500 text-xs">
                    ₹{product.mrp.toFixed(2)}
                  </span>
                  <span className="text-red-500 font-bold">
                    (
                    {(
                      ((product.mrp - product.salePrice) / product.mrp) *
                      100
                    ).toFixed(1)}
                    % OFF)
                  </span>
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
