import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../redux/slice/ProductQuery";
import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

interface Props {
  onClose?: () => void;
}
const ProductSeachbar = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = searchRef?.current?.value;
    dispatch(setSearch(search || ""));

    navigate("/shop");
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSearch}>
      <InputGroup marginRight={"3rem"}>
        <InputLeftElement pointerEvents={"none"}>
          <SearchIcon color={"blackAlpha.400"} />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search"
          variant={"filled"}
          width={"sm"}
          bgColor="blackAlpha.50"
          borderRadius={"lg"}
          ref={searchRef}
        />
      </InputGroup>
    </form>
  );
};

export default ProductSeachbar;
