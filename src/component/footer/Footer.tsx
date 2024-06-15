import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Brand from "../Brand";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { Link as ReactLink } from "react-router-dom";
import FooterSocialIcon from "./FooterSocialIcon";

const Footer = () => {
  const footerMenu = [
    {
      heading: "About Us",
      items: ["Factories", "Contact us", "Help and Advices", "Refund Policy"],
    },
    {
      heading: "Information",
      items: ["Delivery information", "Privacy and policy", "Terms of Use"],
    },
    {
      heading: "Category",
      items: ["New Arrivals", "Our Story"],
    },
  ];
  return (
    <VStack bgColor={"#2B2B2B"}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 5, xl: 5 }}
        color={"white"}
        spacing={5}
        px={"3rem"}
        py={"4rem"}
      >
        <Box>
          <Brand />

          <Text color={"white"} flexWrap={"wrap"} py={2} pr={5}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <HStack gap={4} py={3}>
            <FooterSocialIcon icon={FaFacebook} color={"blue.400"} />
            <FooterSocialIcon icon={FaInstagram} color={"purple.400"} />
            <FooterSocialIcon icon={FaSquareXTwitter} color={"yellow.700"} />
            <FooterSocialIcon icon={FaLinkedin} color={"blue.600"} />
          </HStack>
        </Box>

        {footerMenu.map((footer) => (
          <Box key={footer.heading} px={1}>
            <Text fontWeight={"500"} pb={2}>
              <ChakraLink as={ReactLink} to={"/"}>
                {footer.heading}{" "}
              </ChakraLink>
            </Text>

            {footer.items.map((f) => (
              <Text pb={2} key={f} fontSize={"sm"}>
                <ChakraLink as={ReactLink} to={"/"}>
                  {f}
                </ChakraLink>
              </Text>
            ))}
          </Box>
        ))}

        <Box>
          <Text fontWeight={"500"} pb={2}>
            Contact Us
          </Text>
          <HStack pb={2}>
            <Icon as={LuMail} />
            <Text fontSize={"small"}>Jambura.dev@gmail.com</Text>
          </HStack>
          <HStack>
            <Icon as={IoCallOutline} />
            <Text fontSize={"small"}>+91 7358231504</Text>
          </HStack>
        </Box>
      </SimpleGrid>
      {/* <Grid templateColumns={{xl: "repeat(12, 1fr)"}} gap={2} py={20}>
        <GridItem colStart={2} colEnd={4}>
          <Brand />
          <Text color={"white"} flexWrap={"wrap"} py={2} pr={5}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <HStack gap={4} py={3}>
            <Icon as={FaFacebook} color={"blue.400"} boxSize={4} />
            <Icon as={FaInstagram} color={"purple.400"} boxSize={4} />
            <Icon as={FaSquareXTwitter} color={"yellow"} boxSize={4} />
            <Icon as={FaLinkedin} color={"blue.100"} boxSize={4} />
          </HStack>
        </GridItem>

        <GridItem colStart={5} colEnd={7} color={"white"}>
          <Text fontWeight={"500"} pb={2}>
            About Us
          </Text>
          <Text fontSize={"small"} pb={2}>
            Factories
          </Text>
          <Text fontSize={"small"} pb={2}>
            Contact us
          </Text>
          <Text fontSize={"small"} pb={2}>
            Help and Advices
          </Text>
          <Text fontSize={"small"} pb={2}>
            Refund Policy
          </Text>
        </GridItem>

        <GridItem colSpan={2} color={"white"}>
          <Text fontWeight={"500"} pb={2}>
            Information
          </Text>
          <Text fontSize={"small"} pb={2}>
            Delivery information
          </Text>
          <Text fontSize={"small"} pb={2}>
            Privacy and policy
          </Text>
          <Text fontSize={"small"}>Terms of Use</Text>
        </GridItem>

        <GridItem colSpan={2} color={"white"}>
          <Text fontWeight={"500"} pb={2}>
            Category
          </Text>
          <Text fontSize={"small"} pb={2}>
            New Arrivals
          </Text>
          <Text fontSize={"small"}>Our Story</Text>
        </GridItem>
        <GridItem color={"white"}>
          <Text fontWeight={"500"} pb={2}>
            Contact Us
          </Text>
          <HStack pb={2}>
            <Icon as={LuMail} />
            <Text fontSize={"small"}>Jambura.dev@gmail.com</Text>
          </HStack>
          <HStack>
            <Icon as={IoCallOutline} />
            <Text fontSize={"small"}>+91 7358231504</Text>
          </HStack>
        </GridItem>
      </Grid> */}

      <Divider />

      <Center color={"white"} pb={5} pt={3}>
        <Text fontSize={"small"}>Copyright BR.F, All Rights Reserved.</Text>
      </Center>
    </VStack>
  );
};

export default Footer;
