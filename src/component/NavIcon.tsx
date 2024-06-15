import { Text, Badge, Box, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { CgShoppingBag } from "react-icons/cg";

interface Props {
  count: number;
  iconName: IconType;
  title: string;
  showBadge?: boolean;
}
const NavIcon = ({ count, iconName, title, showBadge = true }: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
    >
      <Box position={"relative"} margin={0} padding={0}>
        <Icon as={iconName} boxSize={6} />
        {showBadge && (
          <Badge
            position={"absolute"}
            top={"-10px"}
            right={"-50%"}
            variant={"solid"}
            px={1.5}
            bg={"yellow.400"}
            borderRadius={"full"}
            color={"black"}
          >
            {count}
          </Badge>
        )}
      </Box>
      <Text fontWeight={"700"} fontSize={"0.833rem"}>
        {title}
      </Text>
    </Box>
  );
};

export default NavIcon;
