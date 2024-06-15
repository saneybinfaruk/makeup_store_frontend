import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
} from "@chakra-ui/react";
import { CgProfile, CgShoppingBag } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import NavIcon from "./NavIcon";
import { Link, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import NavMenuItem from "./NavMenuItem";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slice/ProductQuery";
import { RootState } from "../redux/store";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import authService from "../services/authService";
import ProductSeachbar from "./ProductSeachbar";
import NavItem from "./NavItem";


const Navbar = () => {
  const { cartList } = useSelector((state: RootState) => state.ProductCart);

  const { favoriteList } = useSelector(
    (state: RootState) => state.FavoriteProducts
  );
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };
  return (
    <HStack py={8} justifyContent={"space-between"} px={10}>
      {/* Brand Container */}
      <Brand />

      {/* Search Input */}
      <HStack display={["none", "none", "none", "flex", "flex", "flex"]}>
        <HStack spacing={"2rem"} mr={6}>
          <NavMenuItem label="Home" path="/" />
          <NavMenuItem label="Shop" path="/shop" />
        </HStack>

        <ProductSeachbar />

        <HStack spacing={"2rem"}>
          <Link to={"/favoriteProducts"}>
            <NavIcon
              count={favoriteList.length}
              iconName={FaRegHeart}
              title="Favorite"
            />
          </Link>
          <Link to={`/cartPage`}>
            <NavIcon
              count={cartList.length}
              iconName={CgShoppingBag}
              title="Cart"
            />
          </Link>

          {!user?.email && (
            <Link to={`/signUp`}>
              <NavIcon
                count={cartList.length}
                showBadge={false}
                iconName={IoLockClosedOutline}
                title="Login"
              />
            </Link>
          )}

          {user?.email && (
            <>
              <Link to={`/me`}>
                <NavIcon
                  count={cartList.length}
                  showBadge={false}
                  iconName={CgProfile}
                  title={user?.firstName}
                />
              </Link>

              <Box
                onClick={() => {
                  authService.logout();
                  navigate("/");
                  // window.location.reload();
                }}
              >
                <NavIcon
                  count={cartList.length}
                  showBadge={false}
                  iconName={IoMdLogOut}
                  title="Logout"
                />
              </Box>
            </>
          )}
        </HStack>
      </HStack>

      <IconButton
        aria-label="hamburerIcon"
        icon={<HamburgerIcon />}
        display={["flex", "flex", "flex", "none", "none", "none"]}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader
            display={"flex"}
            flexDir={"column"}
            alignContent={"center"}
            justifyContent={"center"}
            gap={15}
          >
            <Box pt={10}>
              <ProductSeachbar onClose={onClose} />
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={"2rem"} mr={6}>
              <NavItem title="Home" onClick={() => handleNavigation("/")} />
              <NavItem title="Shop" onClick={() => handleNavigation("/Shop")} />

              <VStack spacing={"2rem"} justify={"center"}>
                <Box
                  onClick={() => {
                    navigate("/favoriteProducts");
                    onClose();
                  }}
                >
                  <NavIcon
                    count={favoriteList.length}
                    iconName={FaRegHeart}
                    title="Favorite"
                  />
                </Box>
                <Box
                  onClick={() => {
                    navigate("/cartPage");
                    onClose();
                  }}
                >
                  <NavIcon
                    count={cartList.length}
                    iconName={CgShoppingBag}
                    title="Cart"
                  />
                </Box>

                {!user && (
                  <Box
                    onClick={() => {
                      navigate("/signUp");
                      onClose();
                    }}
                  >
                    <NavIcon
                      count={cartList.length}
                      showBadge={false}
                      iconName={IoLockClosedOutline}
                      title="Login"
                    />
                  </Box>
                )}

                {user && (
                  <>
                    <Box
                      onClick={() => {
                        navigate("/me");
                        onClose();
                      }}
                    >
                      <NavIcon
                        count={cartList.length}
                        showBadge={false}
                        iconName={CgProfile}
                        title={user?.firstName}
                      />
                    </Box>

                    <Box
                      onClick={() => {
                        authService.logout();
                        navigate("/");
                        onClose();
                      }}
                    >
                      <NavIcon
                        count={cartList.length}
                        showBadge={false}
                        iconName={IoMdLogOut}
                        title="Logout"
                      />
                    </Box>
                  </>
                )}
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Navbar;
