import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  path: string;
  label: string;
}
const NavMenuItem = ({label, path}: Props) => {
  return (
    <Text
      width={"max-content"}
      fontWeight={"600"}
      cursor={"pointer"}
      _hover={{ color: "blue" }}
    >
      <Link to={path}>{label}</Link>
    </Text>
  );
};

export default NavMenuItem;
