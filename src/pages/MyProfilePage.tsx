import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Show,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../component/profile/SideNavbar";
import AccordionFilterItem from "../component/AccordionFilterItem";
import PriceInput from "../component/PriceInput";
import { productTypes, categories, brands, tags } from "../constant/options";

const MyProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box px={10} minH={"100vh"}>
      <Grid templateColumns={"repeat(10, 1fr)"} mb={5} gap={10}>
        <Show above="md">
          <GridItem colSpan={2}>
            <SideNavbar />
          </GridItem>
        </Show>

        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter</DrawerHeader>

            <DrawerBody>
              <Box>
                <SideNavbar />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <GridItem colSpan={8}>
          <Show below="md">
            <Button width={"full"} mb={5} borderRadius={"lg"} onClick={onOpen}>
              Menu
            </Button>
          </Show>

          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MyProfilePage;
