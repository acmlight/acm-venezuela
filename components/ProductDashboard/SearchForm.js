import { Flex, Input, Button } from "@chakra-ui/react";
import Selectors from "../Selectors";
import { useForm } from "react-hook-form";

const SearchForm = ({ onSubmit, department, brand }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const advancedSearch = ["department", "brand", "search"];

  const onFocus = (e) => {
    let resetFields = {};
    advancedSearch.forEach((name) => {
      if (e.target.name !== name) {
        resetFields = {
          ...resetFields,
          [name]: "",
        };
      }
    });
    reset(resetFields);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={5}>
        {department && (
          <Selectors
            placeholder="Seleccione"
            options={department}
            register={register}
            name="department"
            onFocus={onFocus}
            label="Especialidad"
          />
        )}
        {brand && (
          <Selectors
            placeholder="Seleccione"
            options={brand}
            register={register}
            name="brand"
            onFocus={onFocus}
            label="Fabricante"
          />
        )}
        <Flex direction="column" color="brand.500">
          <Input
            placeholder="Buscador"
            {...register("search")}
            onFocus={(e) => onFocus(e)}
          />
        </Flex>

        <Button bg="brand.100" color="white" type="submit">
          Buscar
        </Button>
      </Flex>
    </form>
  );
};

export default SearchForm;
