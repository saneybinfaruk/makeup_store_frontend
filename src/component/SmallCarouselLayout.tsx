import {
  Text,
  Box,
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";
import skinPhoto from "./../../public/skinPhoto.png";

const SmallCarouselLayout = () => {
  return (
    <Box
      position={"relative"}
      bgColor={"gray.100"}
      borderRadius={"3xl"}
      p={"2rem"}
      transform={'auto'}
      transition={"all 0.5s ease"} 
    >
      <VStack align={"start"} spacing={"1rem"}>
        <Text fontWeight={"700"} fontSize={"1.2rem"}>
          Skin Core
        </Text>
        <Text width={"50%"}>Lorem ipsum dolor, sit amet consectetur.</Text>
        <Button
          colorScheme="blue"
          width={"8rem"}
          mt={"4rem"}
          borderRadius={"xl"}
          
        >
          See More
        </Button>
      </VStack>
      <Image
        src={skinPhoto}
        boxSize={"15rem"}
        objectFit={"scale-down"}
        position={"absolute"}
        right={0}
        top={0}
      />
    </Box>
  );
};

export default SmallCarouselLayout;
