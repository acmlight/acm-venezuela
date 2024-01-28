import { Flex, Spinner } from "@chakra-ui/react";

const PageLoader = () => {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.100"
        size="xl"
      />
    </Flex>
  );
};

export default PageLoader;
