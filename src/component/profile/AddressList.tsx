import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
} from "@chakra-ui/react";
import { Address } from "../../redux/middleware/ProductApi";
import AddressItem from "./AddressItem";

interface Props {
  address: Address;
  onChange: (address_id: number, value: string) => void;
  onRemove: (address_id: number) => void;
  onEdit: (address_id: number) => void;
}
const AddressList = ({ address, onChange, onRemove, onEdit }: Props) => {
  const { address_id, address_type } = address;

  return (
    <Flex
      flexDir={"column"}
      border={"1px"}
      borderColor={"gray.200"}
      borderRadius={"10px"}
    >
      <AddressItem address={address} />

      <Divider />
      <HStack p={4}>
        <ButtonGroup>
          <Button onClick={() => onEdit(address_id!)}>Edit</Button>
          <Button onClick={() => onRemove(address_id!)}>Remove</Button>
        </ButtonGroup>
        <Spacer />
        <RadioGroup
          onChange={(value) => {
            onChange(address_id!, value);
          }}
          defaultValue={address_type}
          value={address_type}
        >
          <HStack>
            <Radio value="shipping">Shipping</Radio>
            <Radio value="billing">Billing</Radio>
            <Radio value="both">Both</Radio>
          </HStack>
        </RadioGroup>
      </HStack>
    </Flex>
  );
};

export default AddressList;
