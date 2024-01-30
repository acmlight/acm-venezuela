import {
  Box,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import AnimateTitle from "../../containers/AnimateTitle";

const NewsCard = ({ item }) => {
  return (
    <>
      <Card
        w="230px"
        h="400px"
        backgroundColor="transparent"
        border="0"
        shadow="none"
      >
        <CardBody p="10px">
          <Box w="100%" h="70%" position="relative" mb={4}>
            <Image
              fill
              src={item.image ? item.image : '/imagenotfound.png'}
              alt="Green double couch with wooden legs"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>

          <Heading fontSize={{ base: "0.95rem", md: "1.1rem" }} color="white">
            {item.title}
          </Heading>
        </CardBody>
        {item.uploadedAt && (
          <Text fontSize="0.8rem" color="white" m="8px">
            {item.uploadedAt}
          </Text>
        )}

        <Divider color="white" w="60%" margin="0 auto" />
        <CardFooter p="10px">
          <a href={item.link} target="_blank">
            <Button variant="outline" color="white" size="sm">
              Visitar
            </Button>
          </a>
        </CardFooter>
      </Card>
    </>
  );
};

const News = ({ news }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bgColor="white"
      minHeight="600px"
      mt={{ base: "10px", md: '30px' }}
    >
      <Flex
        alignItems="center"
        backgroundColor="brand.100"
        gap={{ base: "10px", md: "50px" }}
        w="100%"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
      >
        <Box pl={{ base: 0, md: "50px" }} pt={{ base: "70px", md: 0 }}>
          <AnimateTitle>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              color="white"
              textAlign="center"
              borderTop="5px solid white"
              borderBottom="5px solid white"
              p="40px 0"
            >
              Novedades
            </Heading>
          </AnimateTitle>
        </Box>

        <Grid
          templateColumns="repeat(auto-fit, minmax(180px, 1fr))"
          gap={{ base: 5, md: 10 }}
          placeItems="center"
          w="100%"
          p={{ base: 10, md: '20px 0' }}
        >
          {news.map((item, index) => (
            <GridItem key={index}>
              <NewsCard item={item} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default News;
