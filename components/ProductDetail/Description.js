import { Flex, Tag, Box } from "@chakra-ui/react";
import ProductHtmlContent from "./ProductHtmlContent";
import Attribute from "./Attribute";

const Description = ({
  category,
  subcategory,
  title,
  brandTitle,
  department,
  description,
  country,
}) => {
  let departmentString = "";
  if (department) {
    if (department.length > 1) {
      for (const dep of department) {
        departmentString = `${dep.title}, ${departmentString}  `;
      }
    } else {
      departmentString = department[0].title;
    }
  }

  return (
    <Flex flex={1} direction="column" gap={6}>
      <Box>
        <Tag
          size="lg"
          backgroundColor="brand.400"
          mr="25px"
          mb="25px"
          color="white"
          fontWeight="700"
        >
          {category}
        </Tag>
        {subcategory && (
          <Tag
            size="lg"
            backgroundColor="brand.400"
            color="white"
            fontWeight="700"
          >
            {subcategory}
          </Tag>
        )}
      </Box>
      <Attribute title="Equipo" content={title} />
      <Attribute title="Fabricante" content={brandTitle} />
      {country && <Attribute title="Origen" country={country} />}
      {department && <Attribute title="Etiquetas" content={departmentString} />}
      <ProductHtmlContent content={description} />
    </Flex>
  );
};

export default Description;
