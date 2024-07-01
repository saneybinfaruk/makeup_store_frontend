import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { productTypes } from "../constant/options";
import { Products } from "../redux/slice/ProductCart";
import CartButton from "./CartButton";
import useCartItem from "../hooks/useCartItem";

interface Props {
  products: Products;
  handleCheckBox: (
    products: Products
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProductCartLayoutTable = ({ products, handleCheckBox }: Props) => {
  const { product, color, quantity } = products;
  const { itemQuantity, updateQuantity, remove } = useCartItem(products);

  return (
    <Tbody>
      <Tr>

        <Td colSpan={1} alignSelf={"center"}>
          <Checkbox
            colorScheme="red"
            defaultChecked
            onChange={handleCheckBox(products)}
          />
        </Td>

        <Td
          colSpan={4}
          display={"flex"}
          alignItems={"center"}
          textAlign={"start"}
        >
          <Image
            src={product?.api_featured_image!}
            boxSize={100}
            objectFit={"cover"}
          />

          <Flex flexDir={"column"} gap={3} px={5} pb={2}>
            <Text fontWeight={"500"} fontSize={"0.9rem"} pt={2}>
              {product?.name}
            </Text>
            <Text fontWeight={"bold"} fontSize={"small"}>
              {
                productTypes.filter((t) => t.value === product?.product_type)[0]
                  ?.label
              }
            </Text>
            {color?.value !== "" && (
              <HStack>
                <Text fontWeight={"600"} fontSize={"small"}>
                  Color
                </Text>
                <Box
                  backgroundColor={color?.value}
                  w={"20px"}
                  h={"30px"}
                  borderRadius={"sm"}
                />
              </HStack>
            )}

            <Button alignSelf={"start"} variant={"link"} onClick={remove}>
              Remove
            </Button>
          </Flex>
        </Td>

        <Td colSpan={2} px={1}>
          <CartButton
            quantity={itemQuantity}
            increament={() => {
              updateQuantity(1);
            }}
            decreament={() => {
              updateQuantity(-1);
            }}
          />
        </Td>

        <Td colSpan={2} pt={2}>
          <Text fontWeight={"bold"} fontSize={"0.9rem"}>
            {product?.price_sign === null ? "$" : product?.price_sign}
            {product?.price}
          </Text>
        </Td>

        <Td colSpan={2} pt={2}>
          <Text fontWeight={"bold"} fontSize={"0.9rem"}>
            {product?.price_sign === null ? "$" : product?.price_sign}
            {(quantity * product?.price).toFixed(2)}
          </Text>
        </Td>

      </Tr>
    </Tbody>
  );
};

export default ProductCartLayoutTable;
