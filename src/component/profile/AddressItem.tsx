import { List, ListItem, Flex, Badge } from "@chakra-ui/react";
import { Address } from "../../redux/middleware/ProductApi";

interface Props {
  address: Address;
}
const AddressItem = ({ address }: Props) => {
  const { address_line, city, state, zip, country, address_type } = address;
  return (
    <List p={4}>
      <ListItem>{address_line}</ListItem>
      <ListItem>{city}</ListItem>
      <ListItem>{state}</ListItem>
      <ListItem>{zip}</ListItem>
      <ListItem>{country}</ListItem>

      <ListItem>
        <Flex gap={2} pt={3} justify={"flex-end"}>
          {address_type === "both" ? (
            <>
              <Badge colorScheme="green">DEFAULT DELIVERY ADDRESS</Badge>
              <Badge colorScheme="orange">DEFAULT BILLING ADDRESS</Badge>
            </>
          ) : address_type === "shipping" ? (
            <Badge colorScheme="green">DEFAULT DELIVERY ADDRESS</Badge>
          ) : address_type === "billing" ? (
            <Badge colorScheme="orange">DEFAULT BILLING ADDRESS</Badge>
          ) : (
            ""
          )}
        </Flex>
      </ListItem>
    </List>
  );
};

export default AddressItem;
