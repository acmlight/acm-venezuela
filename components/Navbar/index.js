import styles from "../../assets/styles/NavBar.module.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";
import {
  Flex,
  Box,
  Center,
  Hide,
  Show,
  useDisclosure,
  IconButton as IconButtonChakra,
} from "@chakra-ui/react";
import NavigationLinks from "./NavigationLinks";
import NavButtons from "./NavButtons";
import NavDrawer from "./NavDrawer";

const NavBar = ({ atTop, pages, openCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        className={atTop ? styles.navBar : styles.navBarFixed}
      >
        <Show breakpoint="(max-width: 1000px)">
          <Box gap={6} className={styles.iconMenu}>
            <NavButtons openCart={openCart} />
            <IconButtonChakra
              bg="brand.100"
              boxShadow="md"
              colorScheme="white"
              size="lg"
              ref={btnRef}
              onClick={onOpen}
              icon={<GiHamburgerMenu />}
            />
          </Box>
        </Show>
        <Hide breakpoint="(max-width: 1000px)">
          <Flex flex={4} justifyContent="space-between">
            <NavigationLinks
              style={atTop ? styles.navBarLink : styles.navBarFixedLink}
              pages={pages}
            />
          </Flex>
        </Hide>

        <Box flex={[1, 1, 1, 2]}>
          <Center>
            <Image
              width={atTop ? 170 : 100}
              height={90}
              alt="ACM Logo"
              src={"/acm-logo.png"}
              priority={1}
            />
          </Center>
        </Box>
        <Hide breakpoint="(max-width: 1000px)">
          <Flex flex={4} gap={[5, 10, 20]} flexDirection="row-reverse">
            <NavButtons openCart={openCart} />
          </Flex>
        </Hide>
      </Flex>
      <NavDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        pages={pages}
      />
    </>
  );
};

export default NavBar;
