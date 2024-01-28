import { Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import { useProductStore } from "../../state";
import ProductCard from "../ProductDashboard/ProductCard";
import useStore from "../../hooks/useStore";

const ProductHistory = () => {

  const productHistory = useStore(useProductStore,state => state.products)
  return (
    <>
      <Grid
        placeItems="center"
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={6}
        p={4}
      >
        {productHistory && productHistory.map((product) => (
          <GridItem key={product.id}>
            <Link href={product.path}>
              <ProductCard
                title={product.title}
                brand={product.brand}
                img={product.image}
                isProduct={true}
              />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default ProductHistory;
