import { Text } from "@chakra-ui/react";
import InputImage from "./InputImage";
import FormContainer from "../../containers/FormContainer";
const AdminInputImage = ({
  error,
  label,
  id,
  register,
  isRequired = false,
  img,
  path,
  options,
  desktop = false,
  maxSize,
  isSquare = false
}) => {
  return (
    <FormContainer label={label} error={error} isRequired={isRequired} id={id}>
      <Text mb={2} fontSize="xs" color="brand.500">
        {path}
      </Text>
      <InputImage
        img={img}
        register={register}
        id={id}
        options={options}
        desktop={desktop}
        maxSize={maxSize}
        isSquare={isSquare}
      />
    </FormContainer>
  );
};

export default AdminInputImage;
