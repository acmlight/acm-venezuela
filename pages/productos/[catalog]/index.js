import { Box, Container, Flex, useToast, Hide } from "@chakra-ui/react";
import { useState } from "react";
import AdvancedSearch from "../../../components/ProductDashboard/AdvancedSearch";
import ProductDashboard from "../../../components/ProductDashboard/ProductDashboard";
import Layout from "../../../containers/Layout";
import { setImagesURLs } from "../../../utils/setImagesURLs";
import submitSearch from "../../../utils/submitSearch";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicHeader = dynamic(() => import("../../../components/Header"));

const Productos = ({
  page,
  pages,
  subcategory,
  department,
  brands,
  categories,
  products,
  colors
}) => {
  const [search, setSearch] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const onSubmit = (data) => {
    const response = submitSearch(data, products);
    if (response && response.length > 0) {
      setSearch(response);
      setDisabled(true);
    } else {
      toast(response);
    }
  };

  //En productDashboard agregamos un key para decirle a React que debe re-renderizars cuando nextjs cambia entre páginas, de manera que
  //no haya problemas recuperando el estado del dashboard desde el sessionstorage
  return (
    <Layout
      atTop={false}
      pages={pages}
      title={`ACM Venezuela - Productos de ${page.title}`}
      description={`Productos de ACM Venezuela. Se ofrece una gran variedad de equipos médicos en el área de ${page.title}`}
    >
      <Hide above="md">
        <DynamicHeader image={page.portraitphone} title={page.title} color={colors.secondary} />
      </Hide>
      <Hide below="md">
        <DynamicHeader image={page.portrait} title={page.title} />
      </Hide>

      <Container
        minHeight="650px"
        maxW={{ base: "100%", md: "70%" }}
        mt="120px"
        pb="90px"
      >
        <Flex gap={20} direction={{ base: "column", md: "row" }}>
          <Box flex={1}>
            <AdvancedSearch
              key={router.asPath}
              department={department}
              brand={brands}
              onSubmit={onSubmit}
            />
          </Box>
          <Box flex={3}>
            <ProductDashboard
              key={router.asPath}
              search={search}
              setSearch={setSearch}
              products={products}
              categories={categories}
              subcategory={subcategory}
              page={page}
              brand={brands}
              disabled={disabled}
              setDisabled={setDisabled}
            />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Productos;

export async function getStaticPaths() {
  const { handlePagesData } = await import("../../../firebase/api");
  const pages = await handlePagesData();

  const paths = pages.map((page) => ({
    params: { catalog: page.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const {
    handleBrandData,
    handlePagesData,
    handleProductsData,
    handleCategoriesData,
    handleBannnersColorsData
  } = await import("../../../firebase/api");
  const colors = await handleBannnersColorsData();
  const pages = await handlePagesData();
  const brands = await handleBrandData();
  const page = { ...pages.filter((page) => page.id === params.catalog) };
  const productsFromFirestore = await handleProductsData(params.catalog);
  const categories = await handleCategoriesData(params.catalog);

  const products = productsFromFirestore.map((item) => ({
    id: item.id,
    title: item.title,
    brand: item.brand,
    department: item.department,
    subcategory: item.subcategory,
    category: item.category,
    portrait: item.portrait,
  }));

  let subcategoryWithImages = [];
  if (categories && categories.subcategory) {
    subcategoryWithImages = await Promise.all(
      categories.subcategory.map(async (item) => {
        if (item.img) {
          const imgURL = await setImagesURLs(item.img);
          return {
            ...item,
            img: imgURL,
          };
        }
        return {
          ...item,
          img: "",
        };
      })
    );
  }

  return {
    props: {
      subcategory: subcategoryWithImages,
      department:
        categories && categories.department ? categories.department : null,
      brands,
      categories:
        categories && categories.categories ? categories.categories : null,
      page: page["0"],
      pages,
      products,
      colors
    },
  };
}
