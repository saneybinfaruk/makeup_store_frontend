import { useEffect } from "react";
import useGetUser from "./useGetUser";
import { useGetSelectedAddressByUserIdQuery } from "../redux/middleware/ProductApi";

const useGetSelectedAddress = () => {
  const user = useGetUser();
  const {
    data: selectedAddress,
    refetch,
    isLoading,
  } = useGetSelectedAddressByUserIdQuery(user?.userId!, {
    skip: !user?.userId,
  });

  console.log('selectedAddress == ', selectedAddress)

  const shipping = selectedAddress?.find(
    (address) => address.address_type === "shipping"
  );
  const billing = selectedAddress?.find(
    (address) => address.address_type === "billing"
  );

  const both = selectedAddress?.find(
    (address) => address.address_type === "both"
  );

  useEffect(() => {
    if (selectedAddress && user) {
      refetch();

      console.log(
        "==============shipping, billing, both======================"
      );
      console.log(shipping, billing, both);
      console.log(
        "===============shipping, billing, both====================="
      );
    }
  }, [selectedAddress, shipping, billing, both, selectedAddress]);

  return { shipping, billing, both, selectedAddress, isLoading };
};

export default useGetSelectedAddress;
