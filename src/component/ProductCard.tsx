import {
  Text,
  Box,
  IconButton,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Product } from "../redux/middleware/ProductApi";
import { useNavigate } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";

interface Props {
  product: Product;
  isFavorite?: boolean;
}
const ProductCard = ({ product }: Props) => {
  const {
    product_id,
    name,
    price,
    price_sign,
    api_featured_image,
    product_type,
  } = product;
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
      borderRadius={"3xl"}
      gap={2}
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
      <Text align={"center"} minH={"4.2rem"} noOfLines={3}>
        {name}
      </Text>
      <Text align={"center"} fontWeight={"500"} fontSize={"sm"} py={2}>
        {product_type}
      </Text>
      <Text fontWeight={"bold"} mb={'3.5rem'}>
        {price_sign === null ? "$" : price_sign}
        {price}
      </Text>

      <Box mt={2} mb={4} position={'absolute'} bottom={0}>
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
