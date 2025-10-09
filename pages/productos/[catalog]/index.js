import { Box, Container, Flex, useToast, Hide } from "@chakra-ui/react";
import { useState } from "react";
import AdvancedSearch from "../../../components/ProductDashboard/AdvancedSearch";
import ProductDashboard from "../../../components/ProductDashboard/ProductDashboard";
import Layout from "../../../containers/Layout";
import { setImagesURLs } from "../../../utils/setImagesURLs";
import submitSearch from "../../../utils/submitSearch";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SEOHead from "../../../components/SEOHead";
import { generateMedicalEquipmentListSchema, generateBreadcrumbSchema } from "../../../utils/structuredData";

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

  // SEO optimization
  const productListSchema = generateMedicalEquipmentListSchema(products, page.title);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "https://www.acm-venezuela.com" },
    { name: "Productos", url: "https://www.acm-venezuela.com/productos" },
    { name: page.title, url: `https://www.acm-venezuela.com/productos/${page.id}` }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [productListSchema, breadcrumbSchema]
  };

  const seoTitle = `Equipos Médicos de ${page.title} | ACM Venezuela`;
  const seoDescription = `Catálogo completo de equipos médicos para ${page.title}. Tecnología de punta, marcas reconocidas mundialmente. ${products.length}+ productos disponibles. Solicita tu cotización.`;
  const keywords = `equipos ${page.title} venezuela, instrumental ${page.title}, dispositivos médicos ${page.title}, ${page.title} caracas, ACM Venezuela`;

  //En productDashboard agregamos un key para decirle a React que debe re-renderizars cuando nextjs cambia entre páginas, de manera que
  //no haya problemas recuperando el estado del dashboard desde el sessionstorage
  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/productos/${page.id}`}
        ogImage={page.portrait || "/about.jpg"}
        keywords={keywords}
        structuredData={structuredData}
      />
      <Layout
        atTop={false}
        pages={pages}
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
    </>
  );
};

export default Productos;

export async function getServerSideProps({ params, req, res }) {
  try {
    const {
      handleBrandData,
      handlePagesData,
      handleProductsData,
      handleCategoriesData,
      handleBannnersColorsData
    } = await import("../../../firebase/api");

    const [colors, pages, brands, productsFromFirestore, categories] = await Promise.all([
      handleBannnersColorsData(),
      handlePagesData(),
      handleBrandData(),
      handleProductsData(params.catalog),
      handleCategoriesData(params.catalog),
    ]);

    // Verificar si las páginas existen
    if (!pages || pages.length === 0) {
      return {
        notFound: true,
      };
    }

    const page = { ...pages.filter((page) => page.id === params.catalog) };

    // Verificar si la página del catálogo específico existe
    if (!page["0"]) {
      return {
        notFound: true,
      };
    }

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

    // Configurar cache headers (opcional)
    if (res) {
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400'
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
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
}
