import { Flex, Tag, Box } from "@chakra-ui/react";
import ProductHtmlContent from "./ProductHtmlContent";
import Attribute from "./Attribute";

const generateDepartmentString = (department) => {
  if (department && department.length > 0) {
    const deparmentTitles = department.map((dep) => dep.title);
    return deparmentTitles.join(", ");
  } else {
    return "";
  }
};

const Description = ({
  category,
  subcategory,
  title,
  brandTitle,
  department,
  description,
  country,
}) => {
  const departmentString = generateDepartmentString(department);
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
      {departmentString && (
        <Attribute title="Etiquetas" content={departmentString} />
      )}
      <ProductHtmlContent content={description} />
    </Flex>
  );
};

export default Description;
