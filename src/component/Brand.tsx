import { Box, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Brand = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      cursor={"pointer"}
      _hover={{
        backgroundColor: "red.50",
        transitionDuration: "3s",
        transitionTimingFunction: "ease-in",
      }}
      onClick={() => navigate("/")}
    >
      <Heading color={"black"} fontWeight={"extrabold"}>
        BR.
      </Heading>
      <Heading color={"gray.200"} fontWeight={"extrabold"}>
        F
      </Heading>
    </Box>
  );
};

export default Brand;
