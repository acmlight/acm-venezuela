import { Box, Heading } from "@chakra-ui/react";
import AnimateTitle from "../containers/AnimateTitle";
import Image from "next/image";
import { headerBlur } from "../assets/blurData";

const Header = ({ image = '/about.jpg', title, color = 'white' }) => {
  return (
    <Box
      height="300px"
      position="relative"
      top="80px"
      backgroundImage="linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0.5) ,rgba(255, 255, 255, 1));"
    >
      <Image
        fill
        src={image}
        alt="Sobre ACM Venezuela"
        style={{ objectFit: "cover", zIndex: -1 }}
        placeholder="blur"
        blurDataURL={headerBlur}
      />
      <Heading
        as="h1"
        size={{ base: "2xl", md: "4xl" }}
        color={color}
        textAlign="center"
        position="absolute"
        fontWeight="700"
        top="50%"
        left={{
          base: "50%",
          md: "5%",
        }}
        transform={{
          base: "translate(-50%,-50%)",
          md: "translate(0%,-50%)",
        }}
        quality="100"
      >
        <AnimateTitle>{title}</AnimateTitle>
      </Heading>
    </Box>
  );
};

export default Header;
