import { Input } from "@chakra-ui/react";
import FormContainer from "../../containers/FormContainer";

const AdminInput = ({
  error,
  defaultValue,
  label,
  id,
  options = {},
  register,
  isRequired = false,
}) => {
  return (
    <FormContainer label={label} error={error} isRequired={isRequired} id={id}>
      <Input
        id={id}
        {...register(id, options)}
        size="sm"
        defaultValue={defaultValue}
      />
    </FormContainer>
  );
};

export default AdminInput;
