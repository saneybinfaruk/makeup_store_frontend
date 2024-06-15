import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex justify={"center"} height={"100vh"} mt={20}>
      <Spinner display={"flex"} size={"xl"} />
    </Flex>
  );
};

export default Loading;
