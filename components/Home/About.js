import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Center,
  Hide,
  AspectRatio,
} from "@chakra-ui/react";
import Image from "next/image";
import { partnersImages } from "../../assets/carouselImages";
import Link from "next/link";
import AnimateTitle from "../../containers/AnimateTitle";
import dynamic from "next/dynamic";

const DynamicCarousel = dynamic(() => import("../Carousel"), {
  loading: () => null,
});

const About = ({brand}) => {

  return (
    <Box
      bgColor="white"
      minHeight="700px"
      p={{ base: "40px 0", md: "0px" }}
      mt={{ base: "20px", md: "60px" }}
      mb={{ base: "20px", md: "60px" }}
    >
      <Flex
        height="100%"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          width={{ base: "100%", md: "50%" }}
          flexDirection="column"
          p={{ base: "0 30px", md: "0 0 0 5%" }}
        >
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            color="brand.300"
            mb={{ base: "5px", md: "20px" }}
          >
            <AnimateTitle>Somos calidad de servicio</AnimateTitle>
          </Heading>
          <Heading
            as="h3"
            size={{ base: "lg", md: "xl" }}
            color="brand.500"
            fontWeight="300"
            marginBottom={{ base: "25px", md: "50px" }}
          >
            Llevamos hasta ti las opciones de avanzada que tu práctica necesita
          </Heading>
          <Text
            fontSize={{ base: "0.8rem", md: "1rem" }}
            fontWeight="400"
            mb="25px"
          >
            Pasión y dedicación, es lo que nos ha caracterizado como empresa en
            nuestros más de 20 años de experiencia al servicio, comercialización
            y distribución de equipos, láseres e insumos Oftalmológicos con
            repercusión en Otorrinolaringología y Cirugía. Desde nuestra
            fundación, nos trazamos como meta fundamental, comprometernos con el
            desafiante universo del cuidado ocular, lo que nos condujo a
            consolidar alianzas importantes con marcas de reconocidos
            proveedores a nivel mundial. Desde entonces, hemos ofrecido a los
            médicos y cirujanos de la salud visual, los más innovadores
            productos con tecnología de punta, tanto en el área de Diagnóstico
            como Quirúrgica.
          </Text>
          <Hide above="md">
            <DynamicCarousel slides={3} size={75} images={brand} />
          </Hide>
          <Link href="/nosotros">
            <Center>
              <Button
                w="100px"
                bg="brand.100"
                color="white"
                boxShadow="md"
                mt="25px"
              >
                Ver más
              </Button>
            </Center>
          </Link>
        </Flex>
        <Center
          mt={{ base: "25px", md: "0px" }}
          width={{ base: "85%", md: "50%" }}
        >
          <AnimateTitle>
            <Box
              position="relative"
              w={{ base: 300, md: 550 }}
              h={{ base: 200, md: 350 }}
            >
              <Image
                src="/acmteam.jpg"
                alt="Equipo de ACM Venezuela"
                fill
                sizes="(max-width: 700px) 100vw, 700px"
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                }}
              />
            </Box>
          </AnimateTitle>
        </Center>
      </Flex>
      <Hide below="md" >
        <Flex direction="column" p="40px 5%" height="250px">
          <Heading
            as="h2"
            size="xl"
            color="brand.300"
            fontWeight="700"
            mb="20px"
          >
            Nuestros socios comerciales
          </Heading>
          <DynamicCarousel
            speed={25000}
            slides={5}
            size={160}
            images={brand}
          />
        </Flex>
      </Hide>
    </Box>
  );
};

export default About;
