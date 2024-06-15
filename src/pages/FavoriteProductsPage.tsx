import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../component/ProductCard";
import ProductGrid from "../component/ProductGrid";

const FavoriteProductsPage = () => {
  const { favoriteList } = useSelector(
    (state: RootState) => state.FavoriteProducts
  );

  console.log("====================================");
  console.log(favoriteList.map((f) => f));
  console.log("====================================");

  return favoriteList.length <= 0 ? (
    <Heading h={"100vh"} textAlign={"center"}>
      No Products
    </Heading>
  ) : (
    <SimpleGrid
      spacing={10}
      columns={{ base: 2, sm: 3, md: 3, lg: 4, xl: 5 }}
      p={"1rem"}
    >
      {favoriteList?.map((product) => (
        <ProductCard
          key={product.product.product_id}
          product={product.product}
          isFavorite={product.favorite}
        />
      ))}
    </SimpleGrid>
  );
};

export default FavoriteProductsPage;
