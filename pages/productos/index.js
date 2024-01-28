import {
  Container
} from "@chakra-ui/react";
import Products from "../../components/Home/Products";
import Layout from "../../containers/Layout";
import dynamic from "next/dynamic";
const DynamicHeader = dynamic(() => import("../../components/Header"));

const Nosotros = ({ pages }) => {

  return (
    <Layout
      atTop={false}
      pages={pages}
      title="ACM Venezuela - Productos"
      description="Contamos con los equipos médicos con la más alta tecnología en el ámbito de la oftalmología, otorrinolaringología, veterinaria y medicina general"
    >
      <DynamicHeader image="/about.jpg" />
      <Container maxW={{ base: "90%", md: "70%" }} mt="120px" pb='40px'>
        <Products pages={pages}/>
      </Container>
    </Layout>
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
  };
}
