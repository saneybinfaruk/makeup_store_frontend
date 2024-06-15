import { Text } from "@chakra-ui/react";

interface Props {
  title: string;
  onClick: () => void;
}

const NavItem = ({ title, onClick }: Props) => {
  return (
    <Text fontWeight={"bold"} cursor={"pointer"} onClick={onClick}>
      {title}
    </Text>
  );
};

export default NavItem;
