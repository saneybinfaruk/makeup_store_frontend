import { Icon } from "@chakra-ui/icons";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  color: string;
}
const FooterSocialIcon = ({icon,color}: Props) => {
  return (
    <Icon cursor={"pointer"} as={icon} color={color} boxSize={4} />
  );
};

export default FooterSocialIcon;
