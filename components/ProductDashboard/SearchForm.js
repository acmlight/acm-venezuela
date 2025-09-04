import { Flex, Input, Button } from "@chakra-ui/react";
import Selectors from "../Selectors";
import { useForm } from "react-hook-form";

const SearchForm = ({ onSubmit, department, brand }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={5}>
        {department && (
          <Selectors
            placeholder="Seleccione"
            options={department}
            register={register}
            name="department"
            label="Especialidad"
          />
        )}
        {brand && (
          <Selectors
            placeholder="Seleccione"
            options={brand}
            register={register}
            name="brand"
            label="Fabricante"
          />
        )}
        <Flex direction="column" color="brand.500">
          <Input
            placeholder="Buscador"
            {...register("search")}
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
