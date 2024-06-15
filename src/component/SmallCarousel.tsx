import { useState } from "react";
import SmallCarouselLayout from "./SmallCarouselLayout";
import { Box, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SmallCarousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const a = [1, 2, 3, 4];

  return (
    <Box position={"relative"}>
      <Box
        pos={"relative"}
        display={"flex"}
        transform={"auto"}
        minWidth={"full"}
        borderRadius={"3xl"}
        my={8}
        overflowX={'hidden'}
      >
        {a.map((b, i) => (
          <Box
            translateX={`${-30 * imageIndex}%`}
            minWidth={"42%"}
            key={b}
            transform={"auto"}
            mr={i < a.length ? 7 : 0}
          >
            <SmallCarouselLayout />
          </Box>
        ))}
      </Box>

      <Flex position={"absolute"} top={"45%"} minWidth={"full"}>
        <IconButton
          icon={<IoIosArrowBack size={20} />}
          aria-label="arrow back"
          bgColor={"white"}
          borderRadius={"full"}
          boxShadow={"md"}
           
          onClick={() => setImageIndex(imageIndex - 1)}
          isDisabled={imageIndex === 0}
        />
        <Spacer />
        <IconButton
          icon={<IoIosArrowForward size={20} />}
          aria-label="arrow back"
          bgColor={"white"}
          borderRadius={"full"}
          boxShadow={"md"}
          onClick={() => setImageIndex(imageIndex + 1)}
          isDisabled={imageIndex >= a.length}
        />
      </Flex>
    </Box>
  );
};

export default SmallCarousel;
