import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { partnersImages } from "../assets/carouselImages";
import AnimateTitle from "../containers/AnimateTitle";
import Layout from "../containers/Layout";
import dynamic from "next/dynamic";


const DynamicHeader = dynamic(() => import("../components/Header"));
const DynamicCarousel = dynamic(() => import("../components/Carousel"));

const Nosotros = ({ pages, brandImages }) => {
  const nosotros = [
    {
      img: "/nosotros/optotechnik.jpg",
      title: "Corporacion Optotechnik: Octubre de 2006.",
      description:
        "Luego de la experiencia adquirida por más de 10 años en oftalmología, neurocirugía y otorrinolaringología, los socios fundadores deciden incursionar en el área de oftalmología de Venezuela",
    },
    {
      img: "/nosotros/acmlight.jpg",
      title: "Inicia actividades ACM Light, LLC. Abril de 2014",
      description:
        "Evaluando oportunidades de negocio, y siguiendo el amplio crecimiento de Venezuela se decidió abrir una nueva sede en Miami, USA para trabajar y soportar a Latin America: ACM Light, LLC.",
    },
    {
      img: "/nosotros/acmve.jpg",
      title: "Inicia actividades ACM Venezuela, CA. 2015",
      description:
        "Como empresa con amplia experiencia en el mercado Venezolano en oftalmología, decidió sub-especializarse, así nació: ACM Venezuela, C.A. como empresa destacada en cirugía oftalmológica y cirugía láser para cubrir el mercado nacional.",
    },
    {
      img: "/nosotros/acmgroup.jpg",
      title: "Grupo ACM. 2016",
      description:
        "Se crea el Grupo ACM, con el propósito de cubrir las necesidades de los clientes en demanda de más y mejores servicios",
    },
  ];
  return (
    <Layout
      atTop={false}
      pages={pages}
      title="ACM Venezuela - Nosotros"
      description="Conoce más acerca de ACM Venezuela"
    >
      <DynamicHeader image="/about.jpg" title="Sobre nosotros" />
      <Container maxW={{ base: "90%", md: "70%" }} mt="120px" pb="40px">
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl" }}
          color="brand.300"
          mb={{ base: "10px", md: "40px" }}
          fontWeight="700"
        >
          ACM Venezuela C.A.
        </Heading>
        <Text
          mb="20px"
          fontSize={{ base: "0.8rem", md: "1rem" }}
          fontWeight="400"
        >
          Somos una empresa dedicada a la comercialización y distribución de
          equipos, láseres e insumos oftalmológicos con repercusión en otras
          áreas como otorrinolaringología, cirugía, veterinaria y odontología.
          Con más de 26 años involucrados en el universo del cuidado ocular, nos
          hemos dedicado a consolidar alianzas con marcas de reconocidos
          proveedores a nivel mundial, con el fin de ofrecer a los médicos y
          cirujanos, los más innovadores productos con tecnología de punta.
        </Text>
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={{ base: 3, md: 6 }}
          mb="40px"
        >
          {nosotros.map((item, index) => (
            <>
              <GridItem
                colSpan={{ base: "2", md: "1" }}
                key={`${index} ${item.title}`}
              >
                <Center>
                  <Image
                    src={item.img}
                    alt="Historia de ACM Venezuela"
                    width={180}
                    height={180}
                  />
                </Center>
              </GridItem>
              <GridItem colSpan={{ base: "3", md: "4" }}>
                <Heading size="md" color="brand.300" fontWeight="700" mb={4}>
                  {item.title}
                </Heading>
                <Text fontSize={{ base: "0.8rem", md: "1rem" }}>
                  {item.description}
                </Text>
              </GridItem>
            </>
          ))}

          <GridItem colSpan={5}>
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems="center"
              gap={10}
            >
              <AnimateTitle>
                <Heading
                  as="h2"
                  size={{ base: "xl", md: "2xl" }}
                  color="brand.300"
                  fontWeight="700"
                >
                  Nuestros valores y propósito
                </Heading>
                <Text
                  fontWeight="300"
                  color="brand.300"
                  fontSize={{ base: "1.2rem", md: "1.5rem" }}
                  mt="20px"
                >
                  Nuestro propósito y motivación en ACM Venezuela es la
                  magnanimidad, a través del préstamo de servicios de soporte y
                  distribución. Integridad con nuestros distribuidores y
                  clientes en cada situación o pregunta.
                </Text>
              </AnimateTitle>

              <Image
                src="/nosotros/valores.jpg"
                alt="valores de ACM Venezuela"
                width={320}
                height={320}
              />
            </Flex>
          </GridItem>
          <GridItem colSpan={5}>
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              color="brand.300"
              fontWeight="700"
              mb="20px"
            >
              Nuestros socios comerciales
            </Heading>
            <DynamicCarousel
              speed={25000}
              slides={4}
              size={160}
              images={brandImages}
            />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Nosotros;

export async function getStaticProps(ctx) {
  const { handlePagesData, handleBrandData } = await import("../firebase/api");
  const pages = await handlePagesData();
  const brand = await handleBrandData()
  const brandImages = brand.map((item) => item.img)
  return {
    props: {
      pages,
      brandImages
    },
  };
}
