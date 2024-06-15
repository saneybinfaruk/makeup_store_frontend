import { Flex, Text, IconButton } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu"; 

interface Props {
  quantity: number;
  increament: () => void;
  decreament: () => void;
}
const CartButton = ({ quantity, increament, decreament }: Props) => {
  return (
    <Flex align={"center"} justifyContent={"space-between"} gap={"1rem"}>
      <IconButton
        icon={<LuMinus />}
        aria-label={"plus button"}
        boxShadow={"base"}
        borderRadius={"full"}
        colorScheme={"gray"}
        onClick={decreament}
        isDisabled={quantity <= 0}
      />
      <Text fontWeight={"500"} fontSize={"0.9rem"}>
        {quantity}
      </Text>
      <IconButton
        icon={<LuPlus />}
        aria-label={"plus button"}
        boxShadow={"base"}
        borderRadius={"full"}
        colorScheme={"gray"}
        onClick={increament}
      />
    </Flex>
  );
};

export default CartButton;
