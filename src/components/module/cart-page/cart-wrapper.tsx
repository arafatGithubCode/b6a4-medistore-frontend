"use client";

import { Button } from "@/components/ui/button";
import { ICart, ICartItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import CartItem from "./cart-item";
import CartSummary from "./cart-summary";

const CartWrapper = ({ cart }: { cart: ICart | undefined }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(cart?.items || []);

  const handleDeleteItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleDecrementQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleIncrementQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity < item.medicine.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.medicine.price * item.quantity,
      0,
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  return (
    <div className="p-6 container mx-auto px-4">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Cart Items ({cartItems.length})
            </h2>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleDecrementQuantity={handleDecrementQuantity}
                handleIncrementQuantity={handleIncrementQuantity}
                handleDeleteItem={handleDeleteItem}
              />
            ))}
          </div>

          {/* Summary Section */}
          <CartSummary
            calculateTotal={calculateTotal}
            calculateSubtotal={calculateSubtotal}
            calculateTax={calculateTax}
          />
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-4">
            <Image
              src="/medicine.png"
              alt="Empty Cart"
              width={120}
              height={120}
              className="mx-auto opacity-50"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Add some medicines to get started!
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartWrapper;
