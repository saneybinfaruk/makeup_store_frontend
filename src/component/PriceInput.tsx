import { Box, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  placeholder: string;
}
const PriceInput = ({ id, placeholder, onChange }: Props) => {
  return (
    <Box>
      <FormLabel htmlFor="minPrice">Min</FormLabel>
      <Input
        type="number"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
};

export default PriceInput;
