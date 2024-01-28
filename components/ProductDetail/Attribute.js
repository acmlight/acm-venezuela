import { Flex, Tag, Text, Box, Button } from "@chakra-ui/react";
import Image from "next/image";

const Attribute = ({ title, content, country }) => {
  return (
    <Flex gap={3} alignItems="center">
      <Text fontWeight="700" color="brand.300">
        {title}
      </Text>
      {content && (
        <Text fontWeight="400" color="brand.500">
          {content}
        </Text>
      )}
      {country && (
        <Flex gap={3}>
          <Text fontWeight="400" color="brand.500">
            {country.charAt(0).toUpperCase() + country.slice(1)}
          </Text>
          <Image
            src={`/paises/${country}.jpg`}
            alt="Pais del equipo"
            width={40}
            height={21}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default Attribute;
