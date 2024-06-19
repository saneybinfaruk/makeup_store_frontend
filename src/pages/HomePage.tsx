import { Flex } from "@chakra-ui/react";
import HeroCarousel from "../component/HeroCarousel";
import ProductContainer from "../component/ProductContainer";
import { useGetNewProductsQuery } from "../redux/middleware/ProductApi";
import InfoSection from "../component/InfoSection";
import Loading from "../component/Loading";

const HomePage = () => {
  const { data, isLoading } = useGetNewProductsQuery();

  if (isLoading) return <Loading />;
  return (
    <Flex direction={"column"}>
      <HeroCarousel data={data!} />
      <ProductContainer products={data || []} heading="New Products" />
      <InfoSection />
    </Flex>
  );
};

export default HomePage;
