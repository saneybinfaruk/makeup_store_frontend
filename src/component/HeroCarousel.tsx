import { Box, Flex, IconButton } from "@chakra-ui/react";
import CarouselLayout from "./CarouselLayout";
import { useState } from "react";
import { LuCircleDot, LuDot } from "react-icons/lu";
import { Product } from "../redux/middleware/ProductApi";

interface Props {
  data: Product[];
}
const HeroCarousel = ({ data }: Props) => {
  const carouselData = data.slice(0, 4);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Box
      pos={"relative"}
      display={"flex"}
      transform={"auto"}
      minWidth={"full"}
      overflow={"hidden"}
    >
      {carouselData.map((b) => (
        <Box
          translateX={`${-100 * imageIndex}%`}
          minWidth={"full"}
          key={b.product_id}
        >
          <CarouselLayout
            name={b.name}
            description={b.description}
            imageUrl={b.api_featured_image}
            productId={b.product_id}
          />
        </Box>
      ))}

      <Flex pos={"absolute"} bottom={"0rem"} right={"1rem"}>
        {carouselData.map((b, i) => (
          <IconButton
            key={b.product_id}
            icon={
              i === imageIndex ? (
                <LuCircleDot color="black" size={30} />
              ) : (
                <LuDot color="black" />
              )
            }
            aria-label="dots button"
            onClick={() => setImageIndex(i)}
            colorScheme=""
          />
        ))}
      </Flex>
    </Box>
  );
};

export default HeroCarousel;
