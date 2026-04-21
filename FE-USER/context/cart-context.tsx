"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GetCartAPI } from "@/util/api";
import { AddToCartAPI } from "@/util/api";

import { RemoveFromCartAPI } from "@/util/api";
import { UpdateCartAPI } from "@/util/api";
import { checkLogin, useAuth } from "./auth-context";
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (variant_id: number, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await GetCartAPI();
        const apiItems = res.data.items;

        const formatted = apiItems.map((item: any) => ({
          id: item.cart_item_id.toString(),
          name: item.product_name + " - " + item.option_name,
          price: item.price,
          quantity: item.quantity,
          image: item.image_url,
        }));

        setItems(formatted);
      } catch (err) {
        console.error("Load cart lỗi:", err);
      }
    };
    if (user) {
      fetchCart();
    }
  }, [user]);

  const addItem = async (variant_id: number, quantity: number) => {
    try {
      await AddToCartAPI(variant_id, quantity);

      // reload cart
      const res = await GetCartAPI();
      const apiItems = res.data.items;

      const formatted = apiItems.map((item: any) => ({
        id: item.cart_item_id.toString(),
        name: item.product_name + " - " + item.option_name,
        price: item.price,
        quantity: item.quantity,
        image: item.image_url,
      }));

      setItems(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await RemoveFromCartAPI(Number(id));

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    try {
      await UpdateCartAPI(Number(id), quantity);

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      total: 0,
      itemCount: 0,
    };
  }
  return context;
}
