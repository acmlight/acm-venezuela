import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { Button, Stack, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const TestimonialsModal = ({ onClose, onSubmit }) => {
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
          label="Link del video"
          id="link"
          error={errors.link}
        />
        <AdminInputImage
          isRequired
          register={register}
          id="portrait"
          label="Imagen referencial (peso menor a 60kb) y dimensiones (340 x 530) "
          error={errors.portrait}
          maxSize={60000}
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

export default TestimonialsModal;
