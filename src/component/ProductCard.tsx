import {
  Text,
  Box,
  IconButton,
  Image,
  Button,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Product } from "../redux/middleware/ProductApi";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";

interface Props {
  product: Product;
  isFavorite?: boolean;
}
const ProductCard = ({ product, isFavorite }: Props) => {
  const { product_id, name, price, price_sign, api_featured_image } = product;
  const navigate = useNavigate();

  const { toggleFavorite, favorite } = useFavorite(product);

  return (
    <Flex
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s ease-in-out",
        overflow: "hidden",
      }}
      align={"center"}
      flexDir={"column"}
      bgColor={"gray.300"}
      gap={5}
      borderRadius={"3xl"}
      p={4}
      position={"relative"}
    >
      <IconButton
        icon={favorite ? <FaHeart /> : <FaRegHeart />}
        aria-label="favorite button"
        borderRadius={"full"}
        color={"red"}
        position={"absolute"}
        right={"0.5rem"}
        top={"0.5rem"}
        onClick={toggleFavorite}
      />
      <Image
        src={api_featured_image}
        boxSize={"200px"}
        objectFit={"scale-down"}
        mt={"1rem"}
        bgColor={"white"}
        borderRadius={"2xl"}
      />
      <Text align={"center"} minH={"4rem"}>
        {name}
      </Text>
      <Text fontWeight={"bold"}>
        {price_sign === null ? "$" : price_sign}
        {price}
      </Text>

      <Box mt={2} mb={4}>
        <Button
          display={"block"}
          colorScheme="red"
          borderRadius={"full"}
          fontSize={"small"}
          px={7}
          onClick={() => {
            navigate(`/products/${product_id}`);
          }}
        >
          View Details
        </Button>
      </Box>
    </Flex>
  );
};

export default ProductCard;
