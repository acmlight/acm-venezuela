/* eslint-disable react/no-children-prop */
import {
  Input,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Box,
} from "@chakra-ui/react";
import { FaPlus, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useFieldArray } from "react-hook-form";
import FormContainer from "../../containers/FormContainer";
const AdminInputGroup = ({
  error,
  label,
  id,
  options = {},
  register,
  watch,
  isRequired = false,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: id,
    control,
  });

  return (
    <FormContainer label={label} error={error} isRequired={isRequired} id={id}>
      <Flex gap={4}>
        <Box flex={2}>
          {fields.map((field, index) => (
            <InputGroup key={field.id} size="md" mb={4}>
              <a
                href={`${watch[index]}`}
                target="_blank"
              >
                <InputLeftAddon children={<FaEye />} />
              </a>
              <Input {...register(`${id}.${index}`, options)} />
              {index > 0 && (
                <InputRightElement width="3.5rem">
                  <Button size="sm" h="1.75rem" onClick={() => remove(index)}>
                    <MdDeleteForever />
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
          ))}
        </Box>
        <Button
          leftIcon={<FaPlus />}
          bg="brand.200"
          color="white"
          boxShadow="md"
          size="sm"
          onClick={() => append("")}
        >
          video
        </Button>
      </Flex>
    </FormContainer>
  );
};

export default AdminInputGroup;
