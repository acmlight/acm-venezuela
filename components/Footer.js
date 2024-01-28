import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Hide,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import NavigationFooterLinks from "./Navbar/NavigationFooterLinks";
const Footer = () => {
  return (
    <Box bgColor="brand.300" p={{ base: "40px 20px", md: "30px 60px" }}>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={{ base: 5, md: 40 }}
      >
        <Hide breakpoint="(max-width: 760px)">
          <GridItem>
            <Flex direction="column" gap="4" h="100%">
              <Heading
                as="h1"
                size={{ base: "md", md: "2xl" }}
                color="white"
                mb={{ base: "5px", md: "20px" }}
              >
                Nosotros
              </Heading>
              <Text fontSize="0.8rem" color="white" mb="auto">
                Nuestra empresa se destaca por su pasión y dedicación en la
                comercialización y distribución de equipos oftalmológicos, con
                un enfoque en Otorrinolaringología y Cirugía. Durante más de 20
                años, hemos establecido alianzas con marcas reconocidas a nivel
                mundial y ofrecido productos innovadores con tecnología avanzada
                para médicos y cirujanos. Nuestro objetivo es seguir siendo
                líderes en el campo, contribuyendo al cuidado ocular y la salud
                visual global.
              </Text>
              <Image
                width={100}
                height={90}
                alt="ACM Logo Blanco"
                src="/acm-logo-white.png"
                style={{ position: "relative", bottom: 0 }}
              />
            </Flex>
          </GridItem>
        </Hide>
        <GridItem fontSize={{ base: "0.8rem", md: "1rem" }}>
          <Flex direction="column" color="white" gap={4}>
            <Heading
              as="h1"
              size={{ base: "md", md: "2xl" }}
              color="white"
              mb={{ base: "5px", md: "20px" }}
            >
              Navegación
            </Heading>
            <NavigationFooterLinks />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            direction="column"
            color="white"
            gap={4}
            fontSize={{ base: "0.8rem", md: "1rem" }}
          >
            <Heading
              as="h1"
              size={{ base: "md", md: "2xl" }}
              color="white"
              mb={{ base: "5px", md: "20px" }}
            >
              Contacto
            </Heading>
            <address>
              Oficina Principal: Terrazas de Club Hípico, Caracas - Venezuela
            </address>
            <a href="tel:+584242639614"> +58 (424) 263 9614 </a>
            <a href="tel:+582129763608"> +58 (212) 976 3608 </a>
            <a href="mailto:info@acm-venezuela.com">info@acm-venezuela.com</a>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              w={{ base: "100%", md: "60%" }}
            >
              <a href="https://www.instagram.com/acmvenezuela/?hl=es-la">
                <AiFillInstagram size="2.5rem" />
              </a>
              <a href="https://www.linkedin.com/company/acm-venezuela/?originalSubdomain=ve">
                <AiFillLinkedin size="2.5rem" />
              </a>
              <a href="https://www.facebook.com/ACMVenezuelaCA/">
                <AiFillFacebook size="2.5rem" />
              </a>
            </Flex>
            <small style={{ position: "relative", bottom: "0" }}>
              © 2021 Todos los derechos reservados por ACM Venezuela.
            </small>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
