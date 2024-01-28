import {
  Box,
  Heading,
  Flex,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import AnimateTitle from "../../containers/AnimateTitle";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import IconButton from "../IconButton";
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import("../Modal"), {
  loading: () => null,
});

const TestimonialBox = ({ portrait, link, sizes }) => (
  <a href={link} target="_blank">
    <Box position="relative" w={sizes.w} h={sizes.h}>
      <Image
        src={portrait}
        alt="Testimonios de los clientes de ACM Venezuela"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          borderRadius: "16px",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <IconButton icon={<BsFillPlayFill size="1.6rem" />} size="lg" />
      </Box>
    </Box>
  </a>
);

const Testimonials = ({ testimonials }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DynamicModal
        isOpen={isOpen}
        onClose={onClose}
        title="Testimonios de nuestros clientes"
        size="xl"
      >
        <SimpleGrid
          spacing={6}
          templateColumns="repeat(auto-fit, minmax(135px, 1fr))"
        >
          {testimonials.map((testimony) => (
            <TestimonialBox
              key={testimony.link}
              portrait={testimony.portrait}
              link={testimony.link}
              sizes={{ w: "135px", h: "260px" }}
            />
          ))}
        </SimpleGrid>
      </DynamicModal>

      <Box
        bgColor="white"
        minHeight="650px"
        p={{ base: "40px 0", md: "0px" }}
        m={{ base: "20px 0 ", md: "60px 0 0 0" }}
      >
        <Flex alignItems="center" direction="column">
          <Flex
            width={{ base: "100%", md: "50%" }}
            flexDirection="column"
            p={{ base: "0 30px", md: "0" }}
          >
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              color="brand.300"
              textAlign="center"
              marginBottom={{ base: "25px", md: "50px" }}
            >
              <AnimateTitle>Testimonios</AnimateTitle>
            </Heading>
            {/* <Heading
              as="h3"
              size={{ base: "xs", md: "md" }}
              color="brand.500"
              textAlign="center"
              fontWeight="300"

            >
              Texto sobre testimonios
            </Heading> */}
          </Flex>
          <Grid
            templateColumns="repeat(auto-fit, minmax(275px, 1fr))"
            gap={{ base: 5, md: 15 }}
            w='100%'
            p='20px'
            placeItems='center'
          >
            {testimonials.map(
              (testimony, index) =>
                index <= 3 && (
                  <GridItem key={testimony.link}>
                    <TestimonialBox
                      portrait={testimony.portrait}
                      link={testimony.link}
                      sizes={{ w: "300px", h: "490px" }}
                    />
                  </GridItem>
                )
            )}
          </Grid>
          <Button
            w="120px"
            bg="brand.100"
            color="white"
            boxShadow="md"
            mt={{ base: "25px", md: "50px" }}
            onClick={onOpen}
          >
            Ver más
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Testimonials;
