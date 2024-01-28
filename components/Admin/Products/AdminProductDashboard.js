import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import AdminProductCard from "./AdminProductCard";
import { useState } from "react";

const Product = ({ link, product, page, brand }) => {
  const productBrand = brand ? brand.filter(item => item.id === product.brand) : []
  return (
    <GridItem>
      <AdminProductCard
        title={product.title}
        brand={productBrand[0]}
        img={product.portrait ? product.portrait : "/imagenotfound.png"}
        link={link}
        id={product.id}
        catalog={page.id}
      />
    </GridItem>
  );
};
const AdminProductDashboard = ({
  products,
  categories,
  page,
  disabled,
  setDisabled,
  brand
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    setDisabled(false);
  };

  return (
    <Tabs
      position="relative"
      variant="enclosed"
      index={tabIndex}
      onChange={handleTabsChange}
      mt="40px"
    >
      <TabList>
        {categories &&
          categories.map((cat, index) => (
            <Tab
              color={disabled ? "brand.600" : "black"}
              fontWeight="500"
              key={index}
              fontSize={{ base: "0.8rem", md: "1rem" }}
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
                  md: "repeat(4, 1fr)",
                }}
                gap={{ base: 3, md: 6 }}
              >
                {products &&
                  products
                    .filter((product) => product.category === cat.id)
                    .map((product) => (
                      <Product
                        key={product.id}
                        link={`${page.id}/${product.id}`}
                        product={product}
                        page={page}
                        brand={brand}
                      />
                    ))}
              </Grid>
            </TabPanel>
          ))}
      </TabPanels>
    </Tabs>
  );
};

export default AdminProductDashboard;
