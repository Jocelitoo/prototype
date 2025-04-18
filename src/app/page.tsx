import { ProductCard } from "@/components/ProductCard";
import { products } from "@/utils/products";

export default function Home() {
  return (
    <div className="px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ProductCard products={products} />
    </div>
  );
}
