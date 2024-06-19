import { Flex, Box, Spinner, Button } from "@chakra-ui/react";
import AddressItem from "./profile/AddressItem";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useGetSelectedAddress from "../hooks/useGetSelectedAddress";

interface Props {
  isShaking?: boolean;
  shakeAnimation?: string;
}
const SelectedAddress = ({ isShaking, shakeAnimation }: Props) => {
  const { isLoading, selectedAddress, billing, shipping, both } =
    useGetSelectedAddress();

  const navigate = useNavigate();
  const handAddressSelect = () => navigate("/me/address");

  if (isLoading)
    return (
      <Flex justify={"center"} height={"100vh"} mt={20}>
        <Spinner display={"flex"} size={"xl"} />
      </Flex>
    );

  return (
    <>
      <Flex justify={"space-between"} gap={5} flexDir={['column','column','column','row','row','row',]}>
        {selectedAddress?.map((address) => (
          <Box
            key={address.address_id}
            border={"1px"}
            borderRadius={"10px"}
            borderColor={"gray.200"}
            py={2}
            flex={1}
          >
            <AddressItem address={address} />
          </Box>
        ))}
      </Flex>
      <Flex justify={"flex-end"} my={3}>
        {billing && !shipping ? (
          <Button
            animation={isShaking ? shakeAnimation : "none"}
            onClick={handAddressSelect}
          >
            Set Shipping Address
          </Button>
        ) : !billing && shipping ? (
          <Button
            animation={isShaking ? shakeAnimation : "none"}
            onClick={handAddressSelect}
          >
            Set Billing Address
          </Button>
        ) : both ? (
          <Button rightIcon={<EditIcon />} onClick={handAddressSelect}>
            Change Address
          </Button>
        ) : shipping && billing ? (
          <Button rightIcon={<EditIcon />} onClick={handAddressSelect}>
            Change Address
          </Button>
        ) : (
          <Button
            leftIcon={<AddIcon />}
            animation={isShaking ? shakeAnimation : "none"}
            onClick={handAddressSelect}
          >
            Set Address
          </Button>
        )}
        {/* {selectedAddress?.length! > 0 ? (
          <Button
            rightIcon={<EditIcon />}
            mt={2}
            mb={4}
            onClick={() => {
              console.log(selectedAddress?.[0].address_type!);

              navigate("/me/address");
            }}
          >
            Change Address
          </Button>
        ) : (
          <Button
            leftIcon={<AddIcon />}
            onClick={() => {
              navigate("/me/address");
            }}
          >
            Set Address
          </Button>
        )} */}
      </Flex>
    </>
  );
};

export default SelectedAddress;
