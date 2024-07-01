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
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  Hide,
  HStack,
  Input,
  Select,
  Show,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ProductCard from "../component/ProductCard";
import { useGetAllProductQuery } from "../redux/middleware/ProductApi";
import {
  brands,
  categories,
  pageItemToShow,
  productTypes,
  sortedBy,
  tags,
} from "../constant/options";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setMaxPrice,
  setMinPrice,
  setPageNumber,
  setProductBrand,
  setProductCategories,
  setProductsTag,
  setProductType,
  setShow,
  setSort,
} from "../redux/slice/ProductQuery";
import { useEffect } from "react";
import AccordionFilterItem from "../component/AccordionFilterItem";
import PriceInput from "../component/PriceInput";
import React from "react";

const ProductsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const productQuery = useSelector((state: RootState) => state.ProductQuery);
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, refetch } =
    useGetAllProductQuery(productQuery);

  useEffect(() => {
    refetch();
  }, [productQuery]);

  const handleProductType =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const productType = event.target.checked
        ? [...productQuery.product_type, type]
        : productQuery.product_type.filter((t) => t !== type);
      dispatch(setProductType(productType));
    };

  const handleProductCategories =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const productCategories = event.target.checked
        ? [...productQuery.categories, type]
        : productQuery.categories.filter((t) => t !== type);
      dispatch(setProductCategories(productCategories));
    };

  const handleProductBrands =
    (brand: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const productBrands = event.target.checked
        ? [...productQuery.brands, brand]
        : productQuery.brands.filter((t) => t !== brand);
      dispatch(setProductBrand(productBrands));
    };

  const handleProductTags =
    (tag: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const productTags = event.target.checked
        ? [...productQuery.tags, tag]
        : productQuery.tags.filter((t) => t !== tag);
      dispatch(setProductsTag(productTags));
    };

  const handleMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    let price = parseInt(event.currentTarget.value);

    dispatch(setMinPrice(isNaN(price) ? null : price));
  };
  const handleMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    let price = parseInt(event.currentTarget.value);
    dispatch(setMaxPrice(isNaN(price) ? null : price));
  };

  const handleSetSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let sortBy = event.currentTarget.value;
    dispatch(setSort(sortBy));
  };

  const handleSetShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let show = event.currentTarget.value;
    dispatch(setShow(parseInt(show)));
  };

  const handleSetPageNumber = (value: number) => {
    dispatch(setPageNumber(value));
  };

  return (
    <Grid
      templateColumns="repeat(12,1fr)"
      gap={{ base: 0, sm: 0, md: 0, lg: 7, xl: 8, "2xl": 10 }}
    >
      {/* Filter Options */}

      <Show above="md">
        <GridItem colSpan={{ sm: 3, md: 3, lg: 3, xl: 3, "2xl": 2 }}>
          <Heading fontSize={"x-large"} pb={5}>
            Filter
          </Heading>

          {/* Options */}
          <Accordion defaultIndex={[0, 1]} allowMultiple>
            {/* Filter - By Product Types */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight={"600"}>
                    Price range
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>
                <Stack
                  gap={"2.5rem"}
                  py={5}
                  direction={[
                    "column",
                    "column",
                    "column",
                    "row",
                    "row",
                    "row",
                  ]}
                >
                  <PriceInput
                    id="minPrice"
                    placeholder="0"
                    onChange={handleMinPrice}
                  />

                  <PriceInput
                    id="maxPrice"
                    placeholder="10,000"
                    onChange={handleMaxPrice}
                  />
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            {/* Filter - By Product Types */}

            <AccordionFilterItem
              data={productTypes}
              onChecked={handleProductType}
              title="Types"
              toCheck={productQuery.product_type}
            />

            {/* Filter - By Categories */}

            <AccordionFilterItem
              data={categories}
              onChecked={handleProductCategories}
              title="Categories"
              toCheck={productQuery.categories}
            />

            {/* Filter - By Brands */}
            <AccordionFilterItem
              data={brands}
              onChecked={handleProductBrands}
              title="Brands"
              toCheck={productQuery.brands}
            />

            {/* Filter - By Tags */}
            <AccordionFilterItem
              data={tags}
              onChecked={handleProductTags}
              title="Tags"
              toCheck={productQuery.tags}
            />
          </Accordion>
        </GridItem>
      </Show>

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter</DrawerHeader>

          <DrawerBody>
            <Box>
              {/* Options */}
              <Accordion defaultIndex={[0, 1]} allowMultiple>
                {/* Filter - By Product Types */}
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"600"}
                      >
                        Price range
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel>
                    <Stack
                      gap={"2.5rem"}
                      py={5}
                      direction={[
                        "column",
                        "column",
                        "column",
                        "row",
                        "row",
                        "row",
                      ]}
                    >
                      <PriceInput
                        id="minPrice"
                        placeholder="0"
                        onChange={handleMinPrice}
                      />

                      <PriceInput
                        id="maxPrice"
                        placeholder="10,000"
                        onChange={handleMaxPrice}
                      />
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>

                {/* Filter - By Product Types */}

                <AccordionFilterItem
                  data={productTypes}
                  onChecked={handleProductType}
                  title="Types"
                  toCheck={productQuery.product_type}
                />

                {/* Filter - By Categories */}

                <AccordionFilterItem
                  data={categories}
                  onChecked={handleProductCategories}
                  title="Categories"
                  toCheck={productQuery.categories}
                />

                {/* Filter - By Brands */}
                <AccordionFilterItem
                  data={brands}
                  onChecked={handleProductBrands}
                  title="Brands"
                  toCheck={productQuery.brands}
                />

                {/* Filter - By Tags */}
                <AccordionFilterItem
                  data={tags}
                  onChecked={handleProductTags}
                  title="Tags"
                  toCheck={productQuery.tags}
                />
              </Accordion>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Filtered Products / Showing All Products if no filter applied */}
      <GridItem
        colStart={{ base: 13, sm: 13, md: 4, lg: 4, xl: 4, "2xl": 3 }}
        colEnd={13}
      >
        {/* Filter Menu */}
        <Box
          width={"100%"}
          pb={"2rem"}
          display={"flex"}
          flexDir={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
            "2xl": "row",
          }}
          justifyContent={"flex-end"}
          gap={{
            base: "2rem",
            sm: "2rem",
            md: "2rem",
            lg: "2rem",
            xl: "2rem",
            "2xl": "2rem",
          }}
        >
          <HStack spacing={1}>
            <Text
              flexWrap={"nowrap"}
              flexShrink={0}
              color={"gray.500"}
              fontWeight={"500"}
            >
              Sort by :
            </Text>
            <Select
              textAlign={"center"}
              variant={"unstyled"}
              width={"auto"}
              onChange={handleSetSort}
              fontWeight={"500"}
              value={productQuery.setSort || ""}
            >
              {sortedBy.map((s) => (
                <option value={s.value} key={s.label}>
                  {s.label
                    .substring(0, 1)
                    .toUpperCase()
                    .concat(s.label.substring(1))}
                </option>
              ))}
            </Select>
          </HStack>

          <HStack spacing={1}>
            <Text
              flexWrap={"nowrap"}
              flexShrink={0}
              color={"gray.500"}
              fontWeight={"500"}
            >
              Show :
            </Text>
            <Select
              textAlign={"center"}
              variant={"unstyled"}
              width={"auto"}
              onChange={handleSetShow}
              fontWeight={"500"}
              value={productQuery.showAmount || ""}
            >
              {pageItemToShow.map((s) => (
                <option value={s} key={s}>
                  {`${s} products`}
                </option>
              ))}
            </Select>
          </HStack>

          <Show below="md">
            <Button variant={"outline"} borderRadius={"lg"} onClick={onOpen}>
              Filter
            </Button>
          </Show>
        </Box>

        {/* No Product Found Message */}
        {data?.products?.length === 0 && (
          <VStack>
            <Heading fontSize={"xl"}>No Products Found</Heading>
            <Text fontSize={"medium"}>
              Sorry, we couldn't find any products that match your filters.
              Please try adjusting your search criteria.
            </Text>
          </VStack>
        )}

        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          gap={6}
          py={"1rem"}
        >
          {data?.products?.map((p) => (
            <ProductCard key={p.product_id + p.name} product={p} />
          ))}
        </SimpleGrid>
        {/* Products Grid */}

        <Flex gap={5} py={10} justify={"center"}>
          <Button
            isDisabled={productQuery.pageNumber === data?.totalPages}
            variant={"outline"}
            onClick={() => handleSetPageNumber(1)}
            isLoading={isFetching || isLoading}
          >
            Load more..
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default ProductsPage;
