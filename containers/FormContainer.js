import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const FormContainer = ({ children, isRequired = false, error, id, label }) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={error}>
      <FormLabel htmlFor={id} fontSize="xs">
        {label}
      </FormLabel>
      {children}
      <FormErrorMessage fontSize="xs">
        {error && error.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormContainer;
