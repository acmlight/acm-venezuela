import { Input, InputGroup, Text, useToast } from "@chakra-ui/react";
import FormContainer from "../../containers/FormContainer";

const AdminInputFile = ({
  error,
  label,
  id,
  register,
  isRequired = false,
  path,
  options = {},
}) => {
  const toast = useToast();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Aquí se realizan las validaciones necesarias para la imagen
      // Crear una URL para la nueva imagen seleccionada
      const fileSize = file.size;

      try {
        if (fileSize <= 12000000) {
        } else {
          throw new Error("El archivo es muy pesado para ser subido");
        }
      } catch (e) {
        event.target.value = null;
        toast({
          description: e.message,
          status: "error",
          duration: 3000,
        });
        console.error(e.message);
      }
    }
  };
  return (
    <FormContainer label={label} error={error} isRequired={isRequired} id={id}>
      <Text mb={2} fontSize="xs" color="brand.500">
        {path}
      </Text>
      <InputGroup size="md">
        <Input
          id="imageFile"
          type="file"
          pr="4.5rem"
          fontSize="xs"
          p={2}
          {...register(id, options)}
          onChange={handleFileChange}
        />
      </InputGroup>
    </FormContainer>
  );
};

export default AdminInputFile;
