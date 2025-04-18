import { StaticImageData } from "next/image";

export interface ProductProps {
  id: string;
  imageUrl: StaticImageData[];
  category: string;
  name: string;
  description: string;
  price: number;
  inStock: number;
}

export interface CartProductProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  inStock: number;
  imageUrl: StaticImageData;
}
