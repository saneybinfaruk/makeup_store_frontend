import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SideNavItem = ({ menu }: { menu: string }) => {
  return (
    <Text p={2} bgColor={"green"} my={2}>
      <Link to={""}>{menu.toUpperCase()}</Link>
    </Text>
  );
};

export default SideNavItem;
