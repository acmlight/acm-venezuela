import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { Card, CardBody, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";
import { useState } from "react";
import EditButton from "../EditButton";

const MedicalCategories = ({
  id,
  title,
  portrait,
  img,
  portraitPath,
  imgPath,
  onSubmit,
  order,
  portraitphone,
  portraitphonePath
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast()
  const [disabled, setDisabled] = useState(true);
  const enableFields = () => {
    setDisabled(!disabled);
  };

  return (
    <Card variant="elevated">
      <CardBody>
        <form>
          <Stack spacing="12px">
            <AdminInput
              isRequired
              register={register}
              error={errors.title}
              defaultValue={title}
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
                disabled,
              }}
            />
            <AdminInputImage
              register={register}
              img={img}
              path={imgPath}
              id="img"
              label="Miniatura de la especialidad (peso menor a 30kb) y dimensiones (400 x 400)"
              error={errors.img}
              options={{ disabled }}
              maxSize={30000}
            />
            <AdminInputImage
              register={register}
              desktop
              img={portrait}
              path={portraitPath}
              id="portrait"
              label="Imagen de portada de la especialidad (peso menor a 70kb) y dimensiones (1600 x 500)"
              error={errors.portrait}
              options={{ disabled }}
              maxSize={70000}
            />
            <AdminInputImage
              register={register}
              desktop
              img={portraitphone}
              path={portraitphonePath}
              id="portraitphone"
              label="Imagen de portada de la especialidad para teléfonos (peso menor a 70kb) y dimensiones (600 x 450)"
              error={errors.portraitphone}
              options={{ disabled }}
              maxSize={70000}
            />
          </Stack>
          <EditButton
            enableFields={enableFields}
            disabled={disabled}
            loader={isSubmitting}
            save={handleSubmit((data) =>
              onSubmit({
                imgPath,
                portraitPath,
                portraitphonePath,
                data: { ...data, id, order },
                enableFields,
                edit: true,
                toast
              })
            )}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default MedicalCategories;
