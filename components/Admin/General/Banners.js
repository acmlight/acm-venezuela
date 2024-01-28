import { Card, CardBody, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";
import { useState } from "react";
import EditButton from "../EditButton";

const Banners = ({
  title,
  description,
  img,
  subtitle,
  imgphone,
  calltoaction,
  onSubmit,
  imgPath,
  imgPhonePath,
  id,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [disabled, setDisabled] = useState(true);
  const toast = useToast()
  const enableFields = () => {
    setDisabled(!disabled);
  };

  return (
    <Card variant="elevated">
      <CardBody>
        <form>
          <Stack spacing="12px">
            <AdminInput
              register={register}
              error={errors.title}
              defaultValue={title}
              label="Título (40 carac.)"
              id="title"
              options={{
                required: "Debe rellenar este campo",
                maxLength: {
                  value: 40,
                  message: maxLengthMessage(40),
                },
                minLength: {
                  value: 5,
                  message: minLengthMessage(5),
                },
                disabled,
              }}
            />
            <AdminInput
              register={register}
              error={errors.subtitle}
              defaultValue={subtitle}
              label="Subtítulo (60 carac.)"
              id="subtitle"
              options={{
                required: "Debe rellenar este campo",
                maxLength: {
                  value: 60,
                  message: maxLengthMessage(60),
                },
                minLength: {
                  value: 5,
                  message: minLengthMessage(5),
                },
                disabled,
              }}
            />
            <AdminInput
              register={register}
              error={errors.description}
              defaultValue={description}
              label="Descripción (260 carac.)"
              id="description"
              options={{
                required: "Debe rellenar este campo",
                maxLength: {
                  value: 260,
                  message: maxLengthMessage(260),
                },
                minLength: {
                  value: 30,
                  message: minLengthMessage(30),
                },
                disabled,
              }}
            />
            <AdminInput
              register={register}
              error={errors.calltoaction}
              defaultValue={calltoaction}
              label="Link externo (opcional)"
              id="calltoaction"
              options={{ disabled }}
            />
            <AdminInputImage
              desktop
              register={register}
              img={img}
              path={imgPath}
              id="img"
              label="Imagen para escritorio (peso menor a 200kb) y dimensiones (2240 x 1260)"
              error={errors.img}
              options={{ disabled }}
              maxSize={250000}
            />
            <AdminInputImage
              register={register}
              img={imgphone}
              path={imgPhonePath}
              id="imgphone"
              label="Imagen para teléfonos (peso menor a 100kb) y dimensiones (700 x 1256)"
              error={errors.imgphone}
              options={{ disabled }}
              maxSize={130000}
            />
          </Stack>
          <EditButton
            enableFields={enableFields}
            disabled={disabled}
            loader={isSubmitting}
            save={handleSubmit((data) =>
              onSubmit(imgPath, imgPhonePath, id, data, enableFields, toast)
            )}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default Banners;
