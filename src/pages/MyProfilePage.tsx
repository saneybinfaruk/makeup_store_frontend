import { Box, Grid, GridItem } from "@chakra-ui/react";
import useGetUser from "../hooks/useGetUser";
import { Outlet } from "react-router-dom";
import SideNavbar from "../component/profile/SideNavbar";

const MyProfilePage = () => {
  return (
    <Box px={10} minH={"100vh"}>
      <Grid templateColumns={"repeat(10, 1fr)"} mb={5} gap={10}>
        <GridItem colSpan={2}>
          <SideNavbar />
        </GridItem>
        <GridItem colSpan={8}>
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MyProfilePage;
