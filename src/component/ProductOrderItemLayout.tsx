import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

import { OrderItems } from "../redux/middleware/ProductApi";

interface Props {
  orderItems: OrderItems;
}
const ProductOrderItemLayout = ({ orderItems }: Props) => {
  const {
    api_featured_image,
    name,
    quantity,
    status,
    color_value,
  } = orderItems;
  return (
    <Grid templateColumns={"repeat(12, 1fr)"} px={8} py={6} gap={6}>
      <GridItem colSpan={2} h={130}>
        <Image
          objectFit={"scale-down"}
          height={"100%"}
          src={api_featured_image}
        />
      </GridItem>

      <GridItem colSpan={4}>
        <Flex flexDir={"column"} gap={5}>
          <Text>{name}</Text>
          <HStack gap={3}>
            <Text>Color</Text>
            <Box width={8} height={10} bgColor={color_value} borderRadius={5} />
          </HStack>
        </Flex>
      </GridItem>

      <GridItem colSpan={1}>
        <Flex justify={"center"}>
          <Text color={"gray.400"}>Qty:</Text>
          <Text px={1}>{quantity}</Text>
        </Flex>
      </GridItem>

      <GridItem colSpan={2} justifySelf={"center"}>
        <Badge
          variant="subtle"
          colorScheme="gray"
          px={5}
          py={1}
          borderRadius={15}
          textTransform={"initial"}
        >
          {status}
        </Badge>
      </GridItem>

      <GridItem colSpan={3} textAlign={"center"}>
        <Text>Delivered on 21 Nov 2023</Text>
      </GridItem>
    </Grid>
  );
};

export default ProductOrderItemLayout;
