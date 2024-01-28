import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import AdminSelector from "../AdminSelector";
import { Button, Stack, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";
const ProductSubcategoriesModal = ({ onSubmit, onClose, page, categories }) => {
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
          catalog: page.id,
          toast
        })
      )}
    >
      <Stack spacing="12px">
        <AdminInput
          isRequired
          register={register}
          label="Título de la subcategoría (max. 45 carac)"
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
        <AdminSelector
          isRequired
          register={register}
          label="Seleccione categoría"
          id="category"
          error={errors.category}
          selectors={categories}
        />
        <AdminInputImage
          isRequired
          register={register}
          id="img"
          label="Imagen de subcategoría (peso menor a 30kb) y dimensiones (300 x 300)"
          error={errors.img}
          maxSize={30000}
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

export default ProductSubcategoriesModal;
