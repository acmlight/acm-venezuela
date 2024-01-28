import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { Button, Stack, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const BrandModal = ({ onClose, onSubmit }) => {
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
          toast,
        })
      )}
    >
      <Stack spacing="12px">
        <AdminInput
          isRequired
          register={register}
          label="Nombre de fabricante"
          id="title"
          error={errors.title}
        />
        <AdminInputImage
          isRequired
          register={register}
          id="img"
          label="Logo fabricante (peso menor a 30kb y formato cuadrado 300 x 300)"
          error={errors.img}
          isSquare={true}
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

export default BrandModal;
