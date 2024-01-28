import { useFieldArray } from "react-hook-form";
import { Button, Flex, Center } from "@chakra-ui/react";
import InputImage from "./InputImage";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import FormContainer from "../../containers/FormContainer";
const AdminImageGroup = ({
  error,
  label,
  id,
  register,
  control,
  isRequired,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: id,
    control,
  });

  return (
    <FormContainer label={label} error={error} isRequired={isRequired} id={id}>
      <Flex gap={4}>
        <Flex flex={2} gap={4} flexDirection="column">
          {fields.map((field, index) => (
            <Center key={field.id} gap={4}>
              <Button size="sm" h="1.75rem" onClick={() => remove(index)}>
                <MdDeleteForever />
              </Button>
              <InputImage
                img={field.link}
                key={field.id}
                register={register}
                id={`images.${index}`}
                maxSize={100000}
              />
            </Center>
          ))}
        </Flex>
        <Button
          leftIcon={<FaPlus />}
          bg="brand.200"
          color="white"
          boxShadow="md"
          size="sm"
          onClick={() => append("")}
        >
          img
        </Button>
      </Flex>
    </FormContainer>
  );
};

export default AdminImageGroup;
