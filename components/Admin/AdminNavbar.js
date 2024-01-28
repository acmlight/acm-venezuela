import styles from "../../assets/styles/NavBar.module.css";
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
  Button,
} from "@chakra-ui/react";
import NavDrawer from "../Navbar/NavDrawer";
import Link from "next/link";
import Image from "next/image";

const AdminNavLinks = ({ pages,auth }) => (
  <Flex justifyContent="space-between" w="100%" alignItems={{base:'none', md:'center'}} gap={3} direction={{base:'column', md:'row'}} >
    <Link href="/admin">General</Link>
    {pages.map((page, index) => (
      <Link key={index} href={`/admin/${page.id}`}>
        {page.title}
      </Link>
    ))}
    <Button onClick={() => auth.signOut()} size="sm" variant="outline" colorScheme="red">
      Cerrar sesión
    </Button>
  </Flex>
);

const NavBar = ({ pages, auth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        className={styles.navBarFixed}
        backgroundColor='white'
        gap={20}
      >
        <Center>
          <Image
            width={90}
            height={80}
            alt="ACM Logo Blanco"
            src={"/acm-logo.png"}
            priority={1}
          />
        </Center>

        <Show below="md">
          <Box gap={6}>
            <IconButtonChakra
              bg="brand.200"
              boxShadow="md"
              colorScheme="white"
              size="lg"
              ref={btnRef}
              onClick={onOpen}
              icon={<GiHamburgerMenu />}
            />
          </Box>
        </Show>
        <Hide breakpoint="(max-width: 760px)">
          <Flex flex={1.8} justifyContent="space-between">
            <AdminNavLinks pages={pages} auth={auth} />
          </Flex>
        </Hide>
      </Flex>
      <NavDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        pages={pages}
      >
        <AdminNavLinks pages={pages} auth={auth} />
      </NavDrawer>
    </>
  );
};

export default NavBar;
