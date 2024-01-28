import { CardBody, Card, Stack, Heading, Box } from "@chakra-ui/react";
import Image from "next/image";
import { productBlur } from "../../assets/blurData";

const ProductCard = ({ title, img = "/imagenotfound.png", brand, isProduct = false }) => {
  return (
    <Card w={{ base: "140px", md: "210px" }} minH={{ base: "210px", md: "240px" }} shadow="md" sx={{ cursor: "pointer" }}>
      <CardBody p={0}>
        <Stack position="relative" w="100%" h={{ base: "150px", md: "180px" }}>
          <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
            placeholder="blur"
            blurDataURL={productBlur}
            quality={50}
          />
          {brand && (
            <Box position="absolute" bottom="10px" right="10px" w={7} h={7}>
              <Image
                src={brand.img}
                alt={`Logo ${brand.title} partner de ACM`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </Box>
          )}
        </Stack>

        <Stack
          spacing="3"
          height={{ base: "60px", md: "80px" }}
          alignItems="center"
          justifyContent="center"
          p={2.5}
          shadow='inset 0 0 5px #dcea8c'
        >
          <Heading
            fontSize={{base:'0.8rem',md:'1rem'}}
            color="brand.100"
            fontWeight={{base:'500',md:'700'}}
            size="md"
            textAlign="center"
            textDecoration={isProduct ? 'underline' : 'null'}
          >
            {title}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
