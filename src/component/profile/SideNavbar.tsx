import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { profileMenu } from "../../constant/options";

const SideNavbar = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(() => {
    return (
      profileMenu.find(
        (menu) =>
          menu.path ===
          location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
      ) || profileMenu[0]
    );
  });

  
  return (
    <Flex flexDir={"column"}>
      {profileMenu.map((menu, index) => (
        <ChakraLink
          key={menu.label}
          as={ReactLink}
          to={menu.path}
          bgColor={selectedMenu === menu ? "green.100" : ""}
          transform={selectedMenu === menu ? "scale(1.05)" : "auto"}
          py={2}
          px={3}
          mb={2}
          onClick={() => {
            setSelectedMenu(menu);
          }}
          _hover={{
            bg: "green.100",
            transform: "scale(1.05)",
            transition: "all 0.2s linear",
            color: "green.500",
          }}
          fontSize={"sm"}
          fontWeight={"500"}
          borderRadius={"5px"}
          color={selectedMenu === menu ? "green.600" : "gray.500"}
        >
          {menu.label.toUpperCase()}
        </ChakraLink>
      ))}
    </Flex>
  );
};

export default SideNavbar;
