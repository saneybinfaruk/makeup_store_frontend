import { Grid, GridItem, Text } from "@chakra-ui/react";
import  { memo } from "react";

const ProductCartHeader = () => {
  return (
    <GridItem rowSpan={1} colSpan={12} py={5} textAlign={"center"}>
      <Grid
        templateColumns={"repeat(11, 1fr)"}
        color={"gray.400"}
        fontWeight={"bold"}
        fontSize={"small"}
      >
        <GridItem colSpan={1} textAlign={"start"} />
        <GridItem colSpan={4} textAlign={"start"}>
          <Text>PRODUCT DETAILS</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>QUANTITY</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>PRICE</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>TOTAL</Text>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default memo(ProductCartHeader);
