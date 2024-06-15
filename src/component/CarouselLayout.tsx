import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Text,
  VStack,
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
      p={"2rem"}
      gap={"1rem"}
      minH={"500px"}
      minWidth={"full"}
      transform={"auto"}
      transition={"transform 0.3s ease-in"}
    >
      <VStack align={"start"} flex={1.2} gap={5} pl={2}>
        <Heading fontSize={"1.44rem"}>{name}</Heading>

        <Text noOfLines={5}>{description}</Text>

        <Button
          variant={"solid"}
          colorScheme="teal"
          marginTop={"2rem"}
          onClick={() => {
            navigate(`/products/${productId}`);
          }}
        >
          Read More
        </Button>
      </VStack>

      <Box
        flex={0.8}
        overflow={"hidden"}
        display={"flex"}
        justifyContent={"flex-end"}
        padding={5}
      >
        <Img objectFit={"cover"} minHeight={"full"} src={imageUrl} />
      </Box>
    </Flex>
  );
};

export default CarouselLayout;
