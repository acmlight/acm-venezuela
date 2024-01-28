import { Card, CardBody, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AdminInput from "../AdminInput";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";
import { useState } from "react";
import EditButton from "../EditButton";
import { updateColors } from "../../../firebase/update";

const BannerColors = ({ primary, secondary }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [disabled, setDisabled] = useState(true);
  const toast = useToast();
  const enableFields = () => {
    setDisabled(!disabled);
  };

  const onSubmit = async (data) => {
    try {
      await updateColors(data);
      toast({
        description: "Colores actualizados correctamente",
        status: "success",
        duration: 3000,
      });
      enableFields();
    } catch (e) {
      toast({
        description: e.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Card variant="elevated">
      <CardBody>
        <form>
          <Stack spacing="12px" direction="row">
            <AdminInput
              isRequired
              register={register}
              error={errors.primary}
              defaultValue={primary}
              label="Color Título (Ej. #ffffff)"
              id="primary"
              options={{
                required: "Debe rellenar este campo",
                maxLength: {
                  value: 7,
                  message: maxLengthMessage(7),
                },
                minLength: {
                  value: 7,
                  message: minLengthMessage(7),
                },
                disabled,
              }}
            />
            <AdminInput
              isRequired
              register={register}
              error={errors.secondary}
              defaultValue={secondary}
              label="Color Subtítulo y Descripción (Ej. #ffffff)"
              id="secondary"
              options={{
                required: "Debe rellenar este campo",
                maxLength: {
                  value: 7,
                  message: maxLengthMessage(7),
                },
                minLength: {
                  value: 7,
                  message: minLengthMessage(7),
                },
                disabled,
              }}
            />
          </Stack>
          <EditButton
            enableFields={enableFields}
            disabled={disabled}
            loader={isSubmitting}
            save={handleSubmit(onSubmit)}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default BannerColors;
