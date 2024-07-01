import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  description: string;
  imageUrl: string;
  productId: number;
}
const CarouselLayout = ({ name, description, imageUrl, productId }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex
      p={{ base: "1rem", sm: "1rem", md: "2rem" }}
      gap={"1rem"}
      minH={"500px"}
      minWidth={"full"}
      transform={"auto"}
      transition={"transform 0.3s ease-in"}
      flexDir={"column"}
    >
      <Flex
        minH={'300px'}
        flexDir={{
          base: "column",
          sm: "column",
          md: "row",
          xl: "row",
          "2xl": "row",
        }}
      >
        <Box flex={0.6}>
          <Heading fontSize={"1.44rem"}>{name}</Heading>

          <Text noOfLines={5}>{description}</Text>
        </Box>

        <Box
          overflow={"hidden"}
          display={"flex"}
          justifyContent={"center"}
          padding={5}
          flex={0.4}
        >
          <Img
            objectFit={"cover"}
            minHeight={"full"}
            src={imageUrl}
            width={{base: "50%",sm: '40%',md: '30%'}}
          />
        </Box>
      </Flex>

      <Button
        variant={"solid"}
        colorScheme="teal"
        alignSelf={"self-start"}
        onClick={() => {
          navigate(`/products/${productId}`);
        }}
      >
        Read More
      </Button>
    </Flex>
  );
};

export default CarouselLayout;
