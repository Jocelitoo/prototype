"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCartContext } from "@/hooks/CartContextProvider";

export const Header = () => {
  const { cartProducts } = useCartContext(); // Pegar os produtos no carrinho

  // Somar a quantidade total de produtos no carrinho
  const totalCartProducts = cartProducts.reduce(
    (acc, cartProduct) => (acc += cartProduct.quantity),
    0
  );

  return (
    <header className="flex items-center justify-between p-4 bg-slate-100">
      <Link href="/">D085 Suplementos</Link>

      <Button variant={"outline"} size={"lg"} asChild>
        <Link href="/carrinho" className="relative">
          <ShoppingCart />
          <p className="sr-only">Carrinho de compras</p>

          {totalCartProducts >= 1 && (
            <span className="absolute -top-3 -right-4 flex items-center justify-center bg-red-500 size-5 rounded-full text-white text-xs ">
              {totalCartProducts >= 99 ? 99 : totalCartProducts}
              {/* Só mostra até 99 */}
            </span>
          )}
        </Link>
      </Button>
    </header>
  );
};
