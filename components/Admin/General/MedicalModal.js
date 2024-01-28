import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { Button, Stack, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";

const MedicalModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          data,
          edit: false,
          onClose,
        })
      )}
    >
      <Stack spacing="12px">
        <AdminInput
          isRequired
          register={register}
          error={errors.title}
          label="Título (30 carac.)"
          id="title"
          options={{
            required: "Debe rellenar este campo",
            maxLength: {
              value: 30,
              message: maxLengthMessage(30),
            },
            minLength: {
              value: 2,
              message: minLengthMessage(2),
            },
          }}
        />
        <AdminInputImage
          isRequired
          register={register}
          id="img"
          label="Miniatura de la especialidad (peso menor a 30kb) y dimensiones (400 x 400)"
          error={errors.img}
          maxSize={30000}
        />
        <AdminInputImage
          desktop
          isRequired
          register={register}
          id="portrait"
          label="Imagen de portada de la especialidad (peso menor a 70kb) y dimensiones (1600 x 500)"
          error={errors.portrait}
          maxSize={70000}
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

export default MedicalModal;
