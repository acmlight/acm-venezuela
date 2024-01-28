import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Description from "../../../components/ProductDetail/Description";
import ProductFooter from "../../../components/ProductDetail/ProductFooter";
import Layout from "../../../containers/Layout";
import useStore from "../../../hooks/useStore";
import { useProductStore } from "../../../state";
import dynamic from "next/dynamic";
import IconButton from "../../../components/IconButton";
import { TbShoppingCartSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
const DynamicProductAccord = dynamic(() =>
  import("../../../components/ProductDetail/ProductAccord")
);
const DynamicProductAssets = dynamic(() =>
  import("../../../components/ProductDetail/ProductAssets")
);
const DynamicHeader = dynamic(() => import("../../../components/Header"));
const DynamicProductHistory = dynamic(
  () => import("../../../components/ProductDetail/ProductHistory"),
  {
    ssr: false,
    loading: () => null,
  }
);

const Equipment = ({ pages, page, product, brandId, brandTitle }) => {
  const router = useRouter();
  const toast = useToast();
  // const addEquipment = useProductStore((state) => state.addEquipment);
  // const equipment = useProductStore((state) => state.equipment);

  const addEquipment = useProductStore((state) => state.addEquipment);
  const equipment = useStore(useProductStore, (state) => state.equipment);
  const addToHistory = useProductStore((state) => state.addToHistory);

  useEffect(() => {
    addToHistory({
      id: product.id,
      title: product.title,
      image: product.images ? product.images[0] : "/imagenotfound.png",
      path: router.asPath,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = () => {
    const isRepeated = equipment.some((equip) => equip.id === product.id);
    if (isRepeated) {
      toast({
        description: "Este producto ya fue añadido al carrito.",
        status: "info",
        duration: 3000,
      });
    } else {
      addEquipment({
        title: product.title,
        description: product.description,
        image: product.images ? product.images[0] : "/imagenotfound.png",
        id: product.id,
      });
    }
  };
  const goBack = () => {
    router.push(`/productos/${page.id}`);
  };

  return (
    <Layout
      atTop={false}
      pages={pages}
      title={`ACM Venezuela - Equipo ${product.title}`}
      description={`Productos de ACM Venezuela. Se ofrece una gran variedad de equipos médicos en el área de ${page.title}`}
    >
      <DynamicHeader image={page.portrait} title={product.title} />
      <Container maxW={{ base: "95%", md: "75%" }} mt="120px" pb="90px">
        <Flex direction={{ base: "column", md: "row" }}>
          <Description
            category={product.category}
            subcategory={product.subcategory}
            title={product.title}
            brandTitle={brandTitle}
            department={product.department}
            description={product.description}
            country={product.country}
          />
          <Box flex={1}>
            <DynamicProductAssets
              images={product.images ? product.images : ["/imagenotfound.png"]}
              title={product.title}
              datasheet={product?.datasheet}
              secondarydatasheet={product?.secondarydatasheet}
              addProduct={addProduct}
              goBack={goBack}
            />
          </Box>
        </Flex>

        {product.details && (
          <DynamicProductAccord
            divider
            title="Detalles de producto"
            content={product.details}
          />
        )}
        {/* <ProductHtmlContent divider content={product.details} /> */}

        {product.tecnical && (
          <DynamicProductAccord
            title="Características Técnicas"
            content={product.tecnical}
          />
        )}

        {product.videos && product.videos.length > 0 && (
          <DynamicProductAccord title="Videos">
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={{ base: 3, md: 6 }}
              p={4}
            >
              {product.videos.map((video, index) => (
                <GridItem key={`${product.title} - ${index}`}>
                  <AspectRatio maxW="420px" ratio={1.5}>
                    <iframe
                      key={index}
                      src={video}
                      title={product.title}
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts"
                      allowFullScreen
                    ></iframe>
                  </AspectRatio>
                </GridItem>
              ))}
            </Grid>
          </DynamicProductAccord>
        )}

        <DynamicProductAccord title="Equipos visitados anteriormente">
          <DynamicProductHistory />
        </DynamicProductAccord>

        <ProductFooter web={product.web} title={product.title} />
      </Container>
    </Layout>
  );
};

export default Equipment;

export async function getStaticPaths() {
  const { getAllProducts, handlePagesData } = await import(
    "../../../firebase/api"
  );
  const pages = await handlePagesData();
  const paths = [];

  // Recorremos los catálogos (oftalmologia,otorrino,etc) y sus productos para crear los objetos de ruta
  for (const page of pages) {
    const products = await getAllProducts(page.id);

    products.forEach((producto) => {
      paths.push({ params: { catalog: page.id, id: producto.id } });
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { handleBrandData, handlePagesData, handleProductsData } = await import(
    "../../../firebase/api"
  );
  const pages = await handlePagesData();
  const page = { ...pages.filter((page) => page.id === params.catalog) };
  const product = await handleProductsData(params.catalog, params.id);
  const brands = await handleBrandData();
  const productBrand = product
    ? brands.find((item) => item.id === product.brand)
    : null;

  return {
    props: {
      page: page["0"],
      pages,
      // product: {
      //   ...product,
      //   datasheet,
      // },
      product,
      brandId: productBrand?.id,
      brandTitle: productBrand?.title,
    },
  };
}
