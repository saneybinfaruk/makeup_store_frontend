import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  useGetOrdersByUserIdQuery,
} from "../../redux/middleware/ProductApi";
import ProductOrderLayout from "../ProductOrderLayout";
import SelectedAddress from "../SelectedAddress";
import authService from "../../services/authService";

const AccountMain = () => {
  const user = authService.getCurrentUser();
  const { data, isLoading } = useGetOrdersByUserIdQuery(user?.userId!, {
    skip: !user?.userId,
  });

  if (isLoading)
    return (
      <Flex justify={"center"} height={"100vh"} mt={20}>
        <Spinner display={"flex"} size={"xl"} />
      </Flex>
    );
  return (
    <Box border={"1px"} borderColor={"gray.200"} borderRadius={"10px"} p={5}>
      <Flex gap={3} pb={8}>
        <Avatar />
        <Flex flexDir={"column"}>
          <Text>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text>{`Email: ${user?.email}`}</Text>
        </Flex>
      </Flex>

      <Box pb={8}>
        <Divider />
      </Box>

      <SelectedAddress />

      <Heading fontSize={"xl"} pt={8}>
        My Orders
      </Heading>
      {data?.map((d) => (
        <ProductOrderLayout key={d.orderId} orders={d} />
      ))}
    </Box>
  );
};

export default AccountMain;
