import { products } from "@/utils/products";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";

interface ProductParamsProps {
  params: Promise<{ id: string }>;
}

const Product: React.FC<ProductParamsProps> = async ({ params }) => {
  const { id } = await params;

  const product = products.find((product) => {
    if (product.id === id) return product;
  });

  if (!product) {
    return <p className="text-center">Produto não encontrado</p>;
  }

  return (
    <div className="px-4 flex-grow grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4 sm:gap-8 my-8 max-w-[1060px] mx-auto">
      <ProductImage product={product} />

      <ProductInfo product={product} />
    </div>
  );
};

export default Product;
