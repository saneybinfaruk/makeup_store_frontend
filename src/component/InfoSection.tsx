import { Divider, SimpleGrid } from "@chakra-ui/react";

import Info from "./Info";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";

const InfoSection = () => {
  const infos = [
    {
      icon: LiaShippingFastSolid,
      heading: "Free Shipping",
      subHeading: "Above All Orders over $ 200",
    },
    {
      icon: AiOutlineDollarCircle,
      heading: "Money Guarantee",
      subHeading: "45 Days for Exchange",
    },
    {
      icon: MdSupportAgent,
      heading: "Online Support",
      subHeading: "24/7 Customer Care",
    },
    {
      icon: BsCreditCard2Front,
      heading: "Flexible Payment",
      subHeading: "Pay with multiple Creadit Card",
    },
  ];
  return (
    <>
      <Divider />
      <SimpleGrid columns={[1, 2, 2, 4, 4]}>
        {infos.map((info) => (
          <Info
            key={info.heading}
            heading={info.heading}
            subHeading={info.subHeading}
            icon={info.icon}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default InfoSection;
