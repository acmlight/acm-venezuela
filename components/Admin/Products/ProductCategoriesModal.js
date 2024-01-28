import AdminInput from "../AdminInput";
import { Button, Stack, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils"

const ProductCategoriesModal = ({onClose, onSubmit, department, page}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast()
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          data,
          onClose,
          department,
          page,
          toast
        })
      )}
    >
      <Stack spacing="12px">
        <AdminInput
          isRequired
          register={register}
          label="Título de la categoría"
          id="title"
          error={errors.title}
          options={{
            required: "Debe rellenar este campo",
            maxLength: {
              value: 45,
              message: maxLengthMessage(45),
            },
            minLength: {
              value: 2,
              message: minLengthMessage(2),
            },
          }}
        />
      </Stack>

      <Button
        bg="brand.300"
        color="white"
        boxShadow="md"
        size="sm"
        mt="24px"
        type="submit"
      >
        {isSubmitting ? <Spinner color="white" size="xs" /> : <>Guardar</>}
      </Button>
    </form>
  );
};

export default ProductCategoriesModal;
