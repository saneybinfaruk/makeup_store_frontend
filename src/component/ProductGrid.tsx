import { SimpleGrid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { Product } from "../redux/middleware/ProductApi";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <SimpleGrid spacing={10} columns={{ base: 2, sm: 3, md: 3, lg: 4, xl: 4 }}>
      {products?.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
