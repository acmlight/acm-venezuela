import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { m } from "framer-motion";
import { useRouter } from "next/router";
const Product = ({ link, product, brand }) => {
  const productBrand = brand
    ? brand.filter((item) => item.id === product.brand)
    : [];

  return (
    <GridItem>
      <m.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}>
        <Link href={link}>
          <ProductCard
            title={product.title}
            brand={productBrand[0]}
            isProduct={true}
            img={product.portrait ? product.portrait : "/imagenotfound.png"}
          />
        </Link>
      </m.div>
    </GridItem>
  );
};

const ProductDashboard = ({
  search,
  categories,
  setSearch,
  products,
  subcategory,
  page,
  brand,
  disabled,
  setDisabled,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabRef = useRef();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedTabIndex = JSON.parse(sessionStorage.getItem("tabIndex"));
    const storedSearch = JSON.parse(sessionStorage.getItem("search"));
    const storedPrevPath = JSON.parse(sessionStorage.getItem("route"));

    if (storedPrevPath === router.asPath) {
      // Restaurar valores almacenados si existen
      if (storedTabIndex !== null) {
        setTabIndex(storedTabIndex);
      }

      if (storedSearch !== null) {
        setSearch(storedSearch);
      }
    } else {
      // Restablecer valores por defecto si la ruta ha cambiado
      setTabIndex(0);
      setSearch([]);
    }

    setDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    setDisabled(false);
    sessionStorage.setItem("route", JSON.stringify(router.asPath));
    sessionStorage.setItem("tabIndex", JSON.stringify(index));
    setSearch([]);
  };

  const handleSubcategory = async (id) => {
    const productsForSubcategory = products.filter(
      (product) => product.subcategory === id
    );

    if (productsForSubcategory.length > 0) {
      setSearch(productsForSubcategory);
      sessionStorage.setItem("search", JSON.stringify(productsForSubcategory));
      sessionStorage.setItem("route", JSON.stringify(router.asPath));
      setDisabled(true);
      //Las animacions de framer motion hacen que el scrollIntoView no funcione el 100% de los casos. Lo ideal sería realizar el scroll utilizando onAnimationComplete
      //Sin embargo, ya que esta animacion se triggerea cada vez que está en la vista, onAnimationComplete no serviría.
      //Por ello, se introduce un retraso de 100ms para luego realizar la acción del scroll únicamente cuando se realiza el clic en una subcategoría
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (tabRef.current) {
        tabRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      toast({
        description: "No hay equipos para esta categoría",
        status: "info",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Tabs
        position="relative"
        variant="enclosed"
        index={tabIndex}
        onChange={handleTabsChange}
        isLazy
      >
        <TabList
          ref={tabRef}
          sx={{
            overflowY: "hidden",
          }}
        >
          {categories &&
            categories.map((cat, index) => (
              <Tab
                color={disabled ? "brand.600" : null}
                _selected={
                  !disabled
                    ? {
                        color: "white",
                        borderRight: "1px solid #c6c6c6",
                        borderLeft: "1px solid #c6c6c6",
                        borderTop: "1px solid #c6c6c6",
                        borderBottomColor: "rgb(255, 255, 255)",
                        bg: "brand.100",
                      }
                    : null
                }
                fontWeight="500"
                key={index}
                fontSize={{ base: "0.8rem", md: "1rem" }}
                onClick={() => handleTabsChange(index)}
              >
                {cat.title}
              </Tab>
            ))}
        </TabList>
        <TabPanels mt="25px">
          {categories &&
            categories.map((cat, index) => (
              <TabPanel key={index}>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={{ base: 3, md: 6 }}
                >
                  {search.length > 0 &&
                    search.map((product) => (
                      <Product
                        key={product.id}
                        link={`/productos/${page.id}/${product.id}`}
                        product={product}
                        brand={brand}
                      />
                    ))}
                  {search.length === 0 &&
                    subcategory
                      .filter((subcat) => subcat.category === cat.id)
                      .map((subcat) => (
                        <GridItem
                          key={subcat.id}
                          onClick={() => handleSubcategory(subcat.id)}
                        >
                          <m.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                          >
                            <ProductCard
                              title={subcat.title}
                              img={
                                subcat.img ? subcat.img : "/imagenotfound.png"
                              }
                            />
                          </m.div>
                        </GridItem>
                      ))}
                  {search.length === 0 &&
                    products
                      .filter(
                        (product) =>
                          product.category === cat.id && !product.subcategory
                      )
                      .map((product) => (
                        <Product
                          key={product.id}
                          link={`/productos/${page.id}/${product.id}`}
                          product={product}
                          brand={brand}
                        />
                      ))}
                </Grid>
              </TabPanel>
            ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProductDashboard;
