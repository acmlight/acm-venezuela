import { Text, Show } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Accord from "../Accordion";

const DynamicSearchForm = dynamic(() => import("./SearchForm"));

const AdvancedSearch = ({ onSubmit, department, brand }) => {
  return (
    <>
      <Show breakpoint="(max-width: 400px)">
        <Accord title="Búsqueda Avanzada" color="brand.300">
          <DynamicSearchForm
            onSubmit={onSubmit}
            department={department}
            brand={brand}
          />
        </Accord>
      </Show>
      <Show breakpoint="(min-width: 400px)">
        <Text fontWeight="600" color="brand.300" mb={8}>
          Búsqueda avanzada
        </Text>
        <DynamicSearchForm
          onSubmit={onSubmit}
          department={department}
          brand={brand}
        />
      </Show>
    </>
  );
};

export default AdvancedSearch;
