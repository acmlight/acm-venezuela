import {
  Container
} from "@chakra-ui/react";
import Products from "../../components/Home/Products";
import Layout from "../../containers/Layout";
import dynamic from "next/dynamic";
import SEOHead from "../../components/SEOHead";

const DynamicHeader = dynamic(() => import("../../components/Header"));

const Nosotros = ({ pages }) => {

  const seoTitle = "Productos | Equipos Médicos ACM Venezuela | Oftalmología y más";
  const seoDescription = "Catálogo completo de equipos médicos: oftalmología, otorrinolaringología, cirugía, veterinaria y odontología. Tecnología de punta de marcas líderes mundiales. Distribuidor autorizado en Venezuela.";
  const keywords = "equipos médicos venezuela, catálogo equipos oftalmológicos, instrumental médico venezuela, equipos cirugía venezuela, dispositivos médicos caracas";

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical="/productos"
        keywords={keywords}
      />
      <Layout
        atTop={false}
        pages={pages}
      >
        <DynamicHeader image="/about.jpg" />
        <Container maxW={{ base: "90%", md: "70%" }} mt="120px" pb='40px'>
          <Products pages={pages}/>
        </Container>
      </Layout>
    </>
  );
};

export default Nosotros;

export async function getStaticProps(ctx) {
  const {handlePagesData} = await import(
    "../../firebase/api"
  );
  const pages = await handlePagesData();
  return {
    props: {
      pages,
    },
    revalidate: 14400, // 4 hours
  };
}
