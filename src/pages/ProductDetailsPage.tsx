import {
  Box,
  Text,
  Heading,
  HStack,
  Image,
  Flex,
  Tooltip,
  Button,
  IconButton,
  Badge,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Center,
  Stack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import {
  SingleProduct,
  useGetProductQuery,
} from "../redux/middleware/ProductApi";
import { RxDotFilled } from "react-icons/rx";
import { useEffect, useState } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import StockBadge from "../component/StockBadge";
import ProductContainer from "../component/ProductContainer";
import InfoSection from "../component/InfoSection";
import { useDispatch } from "react-redux";
import CartButton from "../component/CartButton";
import useShakeAnimation from "../hooks/useShakeAnimation";
import { brands, categories, productTypes } from "../constant/options";
import useFavorite from "../hooks/useFavorite";
import {
  addItemToCartAndSaveToDB,
  updateQuantityAndSaveToDB,
} from "../redux/saveToDBThunk";
import { AppDispatch } from "../redux/store";
import Loading from "../component/Loading";
import authService from "../services/authService";
import ProductBreadcrumb from "../component/ProductBreadcrumb";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, isLoading, refetch } = useGetProductQuery(
    parseInt(productId as string)
  );

  const { product } = data || ({} as SingleProduct);

  let [productOption, setProductOption] = useState({
    color: { color_name: "", value: "" },
    quantity: 0,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { isShaking, handleShake, shakeAnimation } = useShakeAnimation();
  const { toggleFavorite, favorite } = useFavorite(product!);

  const user = authService.getCurrentUser();

  const handleColorSelect = (color_name: string, value: string) => {
    setProductOption({
      ...productOption,

      color: {
        color_name,
        value,
      },
      quantity: 0,
    });
  };

  useEffect(() => {
    setProductOption({
      color: { color_name: "", value: "" },
      quantity: 0,
    });

    window.scroll({ top: 0, behavior: "auto" });
  }, [product?.product_id!]);

  useEffect(() => {
    if (data) {
      refetch();
      console.log(data);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <Box display={"flex"} flexDir={"column"} px={"4rem"}>
      <ProductBreadcrumb
        productName={product.name!}
        productType={product.product_type!}
      />

      <Stack
        direction={["column", "column", "column", "row", "row", "row"]}
        align={"start"}
        minHeight={"400px"}
        overflow={"hidden"}
        bgColor={"red.00"}
        gap={"5rem"}
      >
        <Image
          src={product.api_featured_image}
          flex={1}
          boxSize={"350px"}
          objectFit={"scale-down"}
          borderRadius={"md"}
          marginInline={"auto"}
          border={"1px"}
          borderColor={"gray.200"}
        />
        <Flex flex={1} flexDir={"column"} display={"flex"} gap={2} mr={"5rem"}>
          <Link to={"/"}>
            <Heading fontSize={"0.833rem"}>
              {brands.find((b) => b.value === product.brand)?.label}
            </Heading>
          </Link>
          <Heading fontSize={"1.44rem"}>{product.name}</Heading>
          <HStack>
            <StockBadge amount={product.stock!} />
            <Text>({product.stock} items)</Text>
          </HStack>
          <Heading>
            {product.price_sign === null ? "$" : product.price_sign}
            {product.price}
          </Heading>

          {/* Color Section */}
          {data?.colors?.length! > 0 && (
            <Box>
              <Flex align={"center"} gap={1} py={5}>
                <Text fontWeight={"500"} fontSize={"medium"}>
                  Color
                </Text>
                <RxDotFilled size={18} />
                <Text fontWeight={"700"}>{productOption.color.color_name}</Text>
              </Flex>

              <Flex gap={3} wrap={"wrap"} pb={5}>
                {data?.colors?.map((c) => (
                  <Tooltip
                    hasArrow
                    label={c.color_name}
                    bg={c.hex_value}
                    key={c.hex_value}
                    borderRadius={"full"}
                    colorScheme={c.hex_value}
                  >
                    <Box
                      width={9}
                      height={12}
                      backgroundColor={c.hex_value}
                      borderRadius={"md"}
                      cursor={"pointer"}
                      borderColor={"orange.300"}
                      borderWidth={
                        productOption.color.color_name !== c.color_name
                          ? "0"
                          : "4px"
                      }
                      onClick={() =>
                        handleColorSelect(c.color_name, c.hex_value)
                      }
                    />
                  </Tooltip>
                ))}
              </Flex>
              <Text
                fontSize={"0.83rem"}
                fontWeight={"bold"}
                color={"red.500"}
                animation={isShaking ? shakeAnimation : "none"}
              >
                Choose color
              </Text>
            </Box>
          )}

          <Flex
            align={"center"}
            justify={"space-between"}
            mt={10}
            position={"relative"}
          >
            <Box flex={0.95}>
              <Box
                position={"absolute"}
                zIndex={1}
                left={"45%"}
                transform={"auto"}
                translateX={"-50%"}
                bottom={0}
                width={"30%"}
                display={productOption.quantity > 0 ? "block" : "none"}
              >
                <CartButton
                  quantity={productOption.quantity}
                  increament={() => {
                    setProductOption({
                      ...productOption,
                      quantity: (productOption.quantity += 1),
                    });
                    dispatch(
                      updateQuantityAndSaveToDB({
                        productId: data?.product.product_id!,
                        color: {
                          colorName: productOption.color.color_name,
                          value: productOption.color.value,
                        },
                        quantity: productOption.quantity!,
                        userId: user?.userId!,
                      })
                    );
                  }}
                  decreament={() => {
                    setProductOption({
                      ...productOption,
                      quantity: (productOption.quantity -= 1),
                    });
                    dispatch(
                      updateQuantityAndSaveToDB({
                        productId: data?.product.product_id!,
                        color: {
                          colorName: productOption.color.color_name,
                          value: productOption.color.value,
                        },
                        quantity: productOption.quantity!,
                        userId: user?.userId!,
                      })
                    );
                  }}
                />
              </Box>

              {/* TODO */}
              <Button
                display={productOption.quantity > 0 ? "none" : "flex"}
                leftIcon={<CgShoppingBag size={20} />}
                colorScheme="purple"
                onClick={() => {
                  if (
                    data?.colors.length! > 0 &&
                    productOption.color.color_name === ""
                  ) {
                    handleShake();
                    return;
                  }

                  setProductOption({
                    ...productOption,
                    quantity: (productOption.quantity += 1),
                  });
                  dispatch(
                    addItemToCartAndSaveToDB({
                      product: data?.product!,
                      color: productOption.color!,
                      quantity: productOption.quantity!,
                      userId: user?.userId!,
                    })
                  );
                }}
                width={"full"}
              >
                Add to cart
              </Button>
            </Box>

            <IconButton
              icon={
                favorite ? (
                  <BiSolidHeart size={22} color="red" />
                ) : (
                  <BiHeart size={22} />
                )
              }
              aria-label="favorite button"
              borderRadius={"0.5rem"}
              onClick={toggleFavorite}
            />
          </Flex>

          <Flex align={"center"} gap={1} py={1}>
            <TbTruckDelivery size={18} />
            <Text fontSize={"0.75rem"} fontWeight={"600"}>
              Free delivery on order over $30.0
            </Text>
          </Flex>

          <Divider />

          <Flex gap={2} py={2}>
            {product.categorie !== null && product.categorie !== "" && (
              <HStack>
                <Text>Category: </Text>
                <Text fontWeight={"600"}>
                  <Link to={"/"}>
                    {
                      categories?.find((c) => c.value === product.categorie!)
                        ?.label
                    }
                  </Link>
                </Text>
              </HStack>
            )}
            <Center height="30px" px={2}>
              <Divider orientation="vertical" />
            </Center>
            <HStack>
              <Text>Product Type: </Text>
              <Text fontWeight={"600"}>
                <Link to={"/"}>
                  {
                    productTypes.find((t) => t.value === product.product_type!)
                      ?.label
                  }
                </Link>
              </Text>
            </HStack>
          </Flex>
          <Divider />

          {data?.tags?.length! > 0 && (
            <Flex align={"center"} gap={2} py={5} wrap={"wrap"}>
              <Text>Tags: </Text>
              {data?.tags?.map((tag) => (
                <Badge variant="outline" colorScheme="green" key={tag} p={1}>
                  <Link to={"/"}>{tag}</Link>
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>
      </Stack>

      <Tabs mt={10}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Reviews</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text lineHeight={"1.7rem"}>{product.description!}</Text>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ProductContainer
        heading="Related Products"
        products={data?.relatedProducts!}
      />

      <InfoSection />
    </Box>
  );
};

export default ProductDetails;
