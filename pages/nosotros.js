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
import SEOHead from "../components/SEOHead";
import { generateOrganizationSchema } from "../utils/structuredData";

const DynamicHeader = dynamic(() => import("../components/Header"));
const DynamicCarousel = dynamic(() => import("../components/Carousel"));

const Nosotros = ({ pages, brandImages }) => {
  const nosotros = [
    {
      img: "/nosotros/optotechnik.jpg",
      title: "Corporación Optotechnik – Octubre 2006:",
      description:
        "Tras más de 10 años de experiencia en oftalmología, neurocirugía y otorrinolaringología, los socios fundadores decidieron incursionar en el mercado de oftalmología en Venezuela, sentando las bases de la futura ACM.",
    },
    {
      img: "/nosotros/acmlight.jpg",
      title: "ACM Light, LLC – Abril 2014:",
      description:
        "Evaluando oportunidades de expansión y ante el crecimiento de Latinoamérica, se abrió una sede en Miami, USA, para brindar soporte estratégico y logístico a toda la región: ACM Light, LLC.",
    },
    {
      img: "/nosotros/acmve.jpg",
      title: "ACM Venezuela, C.A. – 2015:",
      description:
        "Con amplia experiencia en el mercado venezolano, nace ACM Venezuela, C.A., especializada en cirugía oftalmológica y cirugía láser, consolidándose como referente en el país.",
    },
    {
      img: "/nosotros/acmgroup.jpg",
      title: "Grupo ACM – 2016:",
      description:
        "Se crea el Grupo ACM con el objetivo de ofrecer soluciones integrales y servicios avanzados, ampliando la cobertura y soporte a clientes en todas las especialidades médicas atendidas.",
    },
  ];

  const organizationSchema = generateOrganizationSchema();
  const seoTitle =
    "Nosotros | ACM Venezuela - Más de 26 Años en Equipos Médicos";
  const seoDescription =
    "Conozca ACM Venezuela C.A., líder en distribución de equipos oftalmológicos, láseres e insumos médicos desde 2006. Más de 26 años de experiencia al servicio de la medicina en Venezuela. Historia, misión y valores.";
  const keywords =
    "acm venezuela historia, empresa equipos médicos venezuela, distribuidores oftalmología venezuela, acm group, corporación optotechnik";

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical="/nosotros"
        keywords={keywords}
        structuredData={organizationSchema}
      />
      <Layout atTop={false} pages={pages}>
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
            En ACM Venezuela nos especializamos en la comercialización y
            distribución de equipos oftalmológicos, láseres médicos e insumos
            quirúrgicos, con aplicaciones también en otorrinolaringología,
            cirugía, veterinaria y odontología. Con más de 26 años de
            experiencia en el cuidado ocular, hemos consolidado alianzas con
            marcas líderes a nivel mundial, ofreciendo a médicos y cirujanos
            productos innovadores y tecnología de punta que optimizan el
            diagnóstico y los procedimientos quirúrgicos en Venezuela y
            Latinoamérica
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
                      unoptimized
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
                    En ACM Venezuela, nuestro propósito es brindar excelencia y
                    soporte integral a médicos, cirujanos y distribuidores. Nos
                    guiamos por la integridad y la transparencia en cada
                    interacción, asegurando que cada consulta, requerimiento o
                    servicio sea atendido con profesionalismo y compromiso.
                  </Text>
                </AnimateTitle>

                <Image
                  src="/nosotros/valores.jpg"
                  alt="valores de ACM Venezuela"
                  width={320}
                  height={320}
                  unoptimized
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
    </>
  );
};

export default Nosotros;

export async function getStaticProps(ctx) {
  const { handlePagesData, handleBrandData } = await import("../firebase/api");
  const [pages, brand] = await Promise.all([
    handlePagesData(),
    handleBrandData(),
  ]);

  const brandImages = brand.map((item) => item.img);
  return {
    props: {
      pages,
      brandImages,
    },
    revalidate: 14400, // 4 hours
  };
}
