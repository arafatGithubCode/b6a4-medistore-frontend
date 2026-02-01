"use client";

import { getCurrentUserCartAction } from "@/actions/cart";
import { ICart } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavbarCart = () => {
  const [cart, setCart] = useState<ICart | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const { success, data } = await getCurrentUserCartAction();
      if (success) {
        setCart(data);
      }
    })();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-0 mx-2">
        <ShoppingCart />
        <span className="bg-red-500 w-5 h-5 rounded-full absolute -top-3 -right-2 text-md text-white flex items-center justify-center font-semibold">
          {cart?.items?.length || 0}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Added Medicines</DropdownMenuLabel>
          {cart?.items?.length ? (
            cart.items.map((item) => (
              <DropdownMenuItem
                key={item.medicineId}
                className="flex justify-between"
              >
                <div className="w-8 h-8 rounded relative">
                  <Image
                    src="/medicine.png"
                    className="rounded"
                    fill
                    alt={item.medicine.name}
                  />
                </div>
                <span>
                  {item.medicine.name} x {item.quantity}
                </span>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem>No items in cart</DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <Link href="/cart" className="w-full flex justify-center">
            <Button className="w-full" variant="link">
              Go Cart
            </Button>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarCart;
