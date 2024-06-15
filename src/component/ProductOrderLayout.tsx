import {
  Flex,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Orders } from "../redux/middleware/ProductApi";
import { formatDateString } from "../utils/FormateDate";
import ProductOrderItemLayout from "./ProductOrderItemLayout";

interface Props {
  orders: Orders;
}

const ProductOrderLayout = ({ orders }: Props) => {
  return (
    <Flex
      flexDir={"column"}
      my={5}
      border={"1px"}
      borderColor={"gray.400"}
      borderRadius={"10px"}
    >
      <Flex align={"self-start"} flexDir={"column"} p={5}>
        <Text fontWeight={"500"}>Order #{orders?.orderId}</Text>
        <Text color={"gray.500"}>
          Placed on {formatDateString(orders?.orderPlacedDate)}
        </Text>
      </Flex>
      <Divider />
      {orders.orderedItems?.map((orderItem, index) => (
        <ProductOrderItemLayout orderItems={orderItem} key={index} />
      ))}
    </Flex>
  );
};

export default ProductOrderLayout;
