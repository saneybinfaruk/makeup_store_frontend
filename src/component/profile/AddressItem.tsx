import { List, ListItem, Flex, Badge } from "@chakra-ui/react";
import { Address } from "../../redux/middleware/ProductApi";

interface Props {
  address: Address;
  selectedAddressType?: {
    shipping: {
      type: string | null;
      addressId: number | null;
    };
    billing: {
      type: string | null;
      addressId: number | null;
    };
    both: {
      type: string | null;
      addressId: number | null;
    };
  };
}
const AddressItem = ({ address, selectedAddressType }: Props) => {
  const { address_line, city, state, zip, country, address_type, address_id } =
    address;

  console.log("From AddressItem === ", selectedAddressType);
  return (
    <List p={4}>
      <ListItem>{address_line}</ListItem>
      <ListItem>{city}</ListItem>
      <ListItem>{state}</ListItem>
      <ListItem>{zip}</ListItem>
      <ListItem>{country}</ListItem>

      <ListItem>
        <Flex
          gap={2}
          pt={3}
          justify={"flex-end"}
          flexDir={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
            "2xl": "row",
          }}
        >
          {selectedAddressType?.both?.addressId === address_id ||
          address_type === "both" ? (
            <>
              <Badge colorScheme="green">DEFAULT DELIVERY ADDRESS</Badge>
              <Badge colorScheme="orange">DEFAULT BILLING ADDRESS</Badge>
            </>
          ) : selectedAddressType?.shipping?.addressId === address_id ||
            address_type === "shipping" ? (
            <Badge colorScheme="green">DEFAULT DELIVERY ADDRESS</Badge>
          ) : selectedAddressType?.billing?.addressId === address_id ||
            address_type === "billing" ? (
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
