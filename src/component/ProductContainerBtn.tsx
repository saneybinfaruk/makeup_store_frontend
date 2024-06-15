import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";

const ProductContainerBtn = ({ heading }: { heading: string }) => {
  return (
    <Box>
      <Flex align={"center"} my={10}>
        <Text fontWeight={"bold"} fontSize={"1.1rem"}>
          {heading}
        </Text>
        <Spacer />
        <Button colorScheme="blue" borderRadius={"2xl"}>
          All Products
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductContainerBtn;
