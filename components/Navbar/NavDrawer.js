import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import styles from "../../assets/styles/NavBar.module.css";
import NavButtons from "./NavButtons";
import NavigationLinks from "./NavigationLinks";

const NavDrawer = ({ isOpen, onClose, btnRef, pages, openCart, children }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Image
            width={80}
            height={90}
            alt="ACM Logo"
            src="/acm-logo.png"
            priority={1}
          />
        </DrawerHeader>
        {children ? (
          <DrawerBody>
            <Flex
                className={styles.navDrawer}
                gap={2}
                color="gray.600"
                justifyContent="space-between"
                flexDirection="column"
              >
                {children}
              </Flex>
          </DrawerBody>
        ) : (
          <>
            <DrawerBody>
              <Flex
                className={styles.navDrawer}
                gap={2}
                color="gray.600"
                justifyContent="space-between"
                flexDirection="column"
              >
                <NavigationLinks
                  style={styles.navBarLinkDrawer}
                  pages={pages}
                />
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Flex gap={10}>
                <NavButtons openCart={openCart} />
              </Flex>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
