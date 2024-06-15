import { Box, Text } from "@chakra-ui/react";
import { Product } from "../redux/middleware/ProductApi";
import ProductGrid from "./ProductGrid";

interface Props {
  heading: string;
  products: Product[];
}
const ProductContainer = ({ heading, products }: Props) => {
  return (
    <Box gap={5} display={"flex"} flexDir={"column"} my={10}>
      <Text fontWeight={"bold"} fontSize={"1.1rem"}>
        {heading}
      </Text>

      <ProductGrid products={products} />
    </Box>
  );
};

export default ProductContainer;
