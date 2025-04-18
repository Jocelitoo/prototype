"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  products: {
    id: string;
    imageUrl: StaticImageData[];
    name: string;
    description: string;
    price: number;
  }[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  return products.map((product, index) => {
    return (
      <Link
        key={index}
        href={`/produto/${product.id}`}
        className="space-y-2 group text-center border p-4 rounded-md "
      >
        <div className="aspect-square overflow-hidden relative w-full bg-slate-200 rounded-md">
          <Image
            src={product.imageUrl[0]}
            fill
            alt={product.name}
            className="w-full h-full object-contain duration-300 group-hover:scale-125"
          />
        </div>

        <p className="line-clamp-1">{product.name}</p>

        <p className="font-semibold">R$ {product.price.toFixed(2)}</p>
      </Link>
    );
  });
};
