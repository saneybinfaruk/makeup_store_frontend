import { useEffect } from "react";
import { useGetOrdersByUserIdQuery } from "../../redux/middleware/ProductApi";
import ProductOrderLayout from "../ProductOrderLayout";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import useClearCartItems from "../../hooks/useClearCartItems";
import authService from "../../services/authService";

const AllOrders = () => {
  const user = authService.getCurrentUser();
  const {
    data: allOrders,
    isLoading,
    refetch: refetchAllOrders,
  } = useGetOrdersByUserIdQuery(user?.userId!, {
    skip: !user?.userId,
  });

  const { clearingState } = useClearCartItems();

  useEffect(() => {
    if (allOrders) {
      refetchAllOrders();
    }
  }, [allOrders]);

  if (isLoading || clearingState)
    return (
      <Flex justify={"center"} height={"100vh"} mt={20}>
        <Spinner display={"flex"} size={"xl"} />
      </Flex>
    );

  return (
    <Box>
      {allOrders?.map((order) => (
        <ProductOrderLayout key={order.orderId} orders={order} />
      ))}
    </Box>
  );
};

export default AllOrders;
