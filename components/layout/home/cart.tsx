"use client";

import * as React from "react";
// import { toast } from "sonner"
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  EmptyCart,
} from "@/app/features/cart.slice";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { LucideDelete, ShoppingBag, Trash } from "lucide-react";
import { Product } from "@/models/product";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from "@/components/ui/empty";

export function Cart({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const isMobile = useIsMobile();
  // console.log(isMobile);
  const { cartItems, totalValue, cartLength } = useSelector(
    (state: any) => state.cart,
  );

  const dispatch = useDispatch();

  function handleConfirm() {
    dispatch(EmptyCart());
    setOpen(false);
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger asChild>
        {/* <ShoppingBag size={24} color="white" /> {children} */}
        <div className="flex items-center gap-2 cursor-pointer ">
          {children}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Favorites</DrawerTitle>
          <DrawerDescription>
            Subtotal ({cartLength} items): ₹{totalValue}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          {cartItems.length > 0 ? (
            <ItemGroup className="w-full max-w-md gap-3 pt-2 ">
              {cartItems.map((product: Product) => (
                <ProductCard product={product} key={product._id.toString()} />
              ))}
            </ItemGroup>
          ) : (
            <Empty>
              <EmptyHeader>Your Wishlist is Empty</EmptyHeader>
              <EmptyContent>
                <EmptyDescription>
                  Explore the page and add your favorate Items
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          )}
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm}>Empty Cart</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <Item variant="outline" key={product._id.toString()}>
      <ItemMedia variant="image">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-square h-24 w-24 rounded-sm object-cover"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">
          {product.name}
          <span className="ml-2 text-muted-foreground font-normal">
            {product.brand}
          </span>
        </ItemTitle>
        <ItemDescription>
          {product.description.slice(0, 70)}...{" "}
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none text-right">
        <ItemDescription className="flex flex-col gap-1">
          ₹{product.salePrice.toFixed(2)}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          onClick={() => dispatch(removeFromCart(product))}
          variant="destructive"
          size="sm"
        >
          <Trash />
        </Button>
      </ItemActions>
    </Item>
  );
};
