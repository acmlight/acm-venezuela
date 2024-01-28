import { Text, Divider, Center } from "@chakra-ui/react";

const ProductFooter = ({ web, title }) => {
  return (
    <>
      {web && (
        <>
          <Divider m="40px 0" />

          <Center>
            <Text mb="40px" fontWeight="400" color="brand.500">
              Para mayor información, visitar el sitio{" "}
              <a
                href={web}
                target="_blank"
                style={{ color: "#b0d236", textDecoration: "underline" }}
              >
                web
              </a>
            </Text>
          </Center>
        </>
      )}
      <Text
        bgGradient="linear(to-r, #dcea8c, #b5eaea)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="700"
        textAlign="center"
        m="40px 0 0 0"
      >
        {title}
      </Text>
    </>
  );
};

export default ProductFooter;
