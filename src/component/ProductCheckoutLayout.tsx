import { Flex, Image, Box, Text, Divider, HStack } from "@chakra-ui/react";
import { Products } from "../redux/slice/ProductCart";

interface Props {
  products: Products;
}
const ProductCheckoutLayout = ({ products }: Props) => {
  const {
    color,
    product: { api_featured_image, name, brand, price },
    quantity,
  } = products;

  return (
    <Box boxShadow={"base"} p={5} borderRadius={"10px"} my={3}>
      <Flex align={"center"} justify={"space-between"} py={2} mb={2}>
        <Flex flex={0.5} gap={3} align={"center"}>
          <Image boxSize={"60px"} src={api_featured_image} />
          <Flex flexDir={"column"}>
            <Text fontSize={"sm"} fontWeight={"600"}>
              {name}
            </Text>
            <Text fontSize={"xs"} fontWeight={"500"}>
              {brand}
            </Text>
            <Flex gap={1}>
              <Text fontSize={"xs"}>Color: </Text>
              <Box bgColor={color.value} w={4} h={5} borderRadius={"3px"} />
            </Flex>
          </Flex>
        </Flex>

        <Flex justify={"center"} align={"center"} flex={0.2}>
          <Text fontSize={"xs"}>Qty:</Text>
          <Text fontSize={"sm"} fontWeight={"500"}>
            {quantity}
          </Text>
        </Flex>

        <Text flex={0.2} fontSize={"sm"} align={"end"} fontWeight={"600"}>
          ${price}
        </Text>
      </Flex>
      <Divider />
      <HStack justify={"flex-end"} align={"center"}>
        <Text fontSize={"sm"} py={3}>
          {quantity} item(s). Subtotal:
        </Text>
        <Text fontSize={"md"} py={3} fontWeight={"500"}>
          ${(quantity * price).toFixed(2)}
        </Text>
      </HStack>
    </Box>
  );
};

export default ProductCheckoutLayout;
