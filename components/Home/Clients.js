import {
  Box,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Grid,
  GridItem,
  Show,
  Hide,
} from "@chakra-ui/react";
import Image from "next/image";
import { headerBlur } from "../../assets/blurData";
import styles from "../../assets/styles/Home.module.css";
import Carousel from "../Carousel";
import { clientesImages, clientesCarousel } from "../../assets/carouselImages";
import AnimateTitle from "../../containers/AnimateTitle";
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import("../Modal"), {
  loading: () => <span>...</span>,
});
const DynamicCarousel = dynamic(() => import("../Carousel"), {
  loading: () => null,
});

const Clients = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        title="Clientes que confían en ACM Venezuela"
      >
        <Grid
          templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          {clientesImages.map((item, index) => (
            <GridItem key={index}>
              <Image
                src={item}
                alt="Cliente ACM Venezuela"
                width={150}
                height={150}
              />
            </GridItem>
          ))}
        </Grid>
      </DynamicModal>
      <Box height="600px" position="relative" clipPath="inset(0 0 0 0)">
        <Show below="md">
          <Image
            fill
            style={{ objectFit: "cover", zIndex: -1 }}
            src="/clientesmobile.jpg"
            alt="Clientes ACM"
            placeholder="blur"
            blurDataURL={headerBlur}
          />
        </Show>
        <Hide below="md">
          <div className={styles.parallaxContainer}>
            <Image
              fill
              style={{ objectFit: "cover" }}
              src="/clientes.jpg"
              alt="Clientes ACM"
              placeholder="blur"
              blurDataURL={headerBlur}
            />
          </div>
        </Hide>

        <Flex
          flexDirection="column"
          alignItems={{ base: "center", md: "end" }}
          pr={{ base: "0", md: "10%" }}
          justifyContent="center"
          h="100%"
        >
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            color="white"
            textAlign={{ base: "center", md: "right" }}
            mb={{ base: "5px", md: "20px" }}
          >
            <AnimateTitle>Nuestros clientes</AnimateTitle>
          </Heading>
          <Heading
            as="h3"
            size={{ base: "sm", md: "md" }}
            color="white"
            textAlign={{ base: "center", md: "right" }}
            fontWeight="400"
            mb="75px"
          >
            Con más de 20 años de experiencia a su servicio
          </Heading>
          <Hide below="md">
            <Box w={{ base: "300px", md: "400px" }}>
              <DynamicCarousel
                images={clientesCarousel}
                slides={2}
                size={160}
              />
            </Box>
          </Hide>
          <Hide above="md">
            <Box w='300px'>
              <DynamicCarousel
                images={clientesCarousel}
                slides={1}
                size={80}
              />
            </Box>
          </Hide>
          <Box mt="75px">
            <Button
              w="120px"
              bg="brand.100"
              color="white"
              boxShadow="md"
              mt="25px"
              onClick={onOpen}
            >
              Ver clientes
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Clients;
