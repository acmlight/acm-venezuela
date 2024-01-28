import {
  Box,
  Heading,
  Flex,
  Text,
  Grid,
  GridItem,
  Avatar,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import AnimateTitle from "../../containers/AnimateTitle";
import Image from "next/image";
import { productBlur } from "../../assets/blurData";

const Products = ({ pages }) => {
  return (
    <Box bgColor="white" height="auto" p={{ base: "40px 0", md: "0 0 5% 0" }}>
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
            mb={{ base: "5px", md: "20px" }}
          >
            <AnimateTitle>Productos</AnimateTitle>
          </Heading>
          <Heading
            as="h3"
            size={{ base: "xs", md: "md" }}
            color="brand.500"
            textAlign="center"
            fontWeight="300"
            marginBottom={{ base: "25px", md: "50px" }}
          >
            ACM Venezuela le garantiza una completa y correcta asesoría en
            cualquiera de los productos y servicios que ofrecemos.
          </Heading>
        </Flex>
        <Grid
          templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
          gap={{ base: 5, md: 20 }}
        >
          {pages.map((page, index) => (
            <GridItem key={index}>
              <Link href={`/productos/${page.id}`}>
                <Flex alignItems="center" direction="column" gap={5}>
                  <Box w="150px" h="150px" shadow='lg' position="relative" borderRadius='50%'>
                    <Image
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(white, white) padding-box, linear-gradient(to right, #dcea8c, white) border-box",
                        border: "6px solid transparent",
                        backgroundPosition: "center",
                      }}
                      fill
                      src={page.img}
                      alt={page.title}
                    />
                  </Box>

                  <Text
                    fontSize={{ base: "0.8rem", md: "1rem" }}
                    width={{ base: "80%", md: "100%" }}
                    color="brand.100"
                    textAlign="center"
                    fontWeight="600"
                  >
                    {page.title}
                  </Text>
                </Flex>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default Products;
