import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { memo } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  heading: string;
  subHeading: string;
}
const Info = ({ icon, heading, subHeading }: Props) => {
  return (
    <Box
      display={"flex"}
      gap={"1rem"}
      px={2}
      py={8} 
      alignItems={"center"}
      justifyContent={'center'}
    >
      <Icon as={icon} boxSize={"2rem"} />
      <Flex flexDir={"column"}>
        <Text fontWeight={"700"} fontSize={"1rem"} mb={0.5}>
          {heading}
        </Text>
        <Text fontSize={"0.694rem"}>{subHeading}</Text>
      </Flex>
    </Box>
  );
};

export default memo(Info);
