import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { Card, CardBody, Text,Button, Stack, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";
import { useState } from "react";
import EditButton from "../EditButton";
const AdminNews = ({ image, imagePath, link, title, onSubmit, uploadedAt,id }) => {
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
              label="Título de la noticia (85 carac.)"
              id="title"
              options={{
                maxLength: {
                  value: 85,
                  message: maxLengthMessage(85),
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
              error={errors.link}
              defaultValue={link}
              label="Link de la noticia"
              id="link"
              options={{
                disabled,
              }}
            />
            <AdminInputImage
              register={register}
              img={image}
              path={imagePath}
              id="image"
              label="Imagen de la noticia (peso menor a 60kb) y dimensiones (400 x 400)"
              error={errors.image}
              options={{
                disabled,
              }}
              maxSize={60000}
            />
            <Text fontSize='sm' color='brand.500'>Creado el {uploadedAt}</Text>

          </Stack>
          <EditButton
            enableFields={enableFields}
            loader={isSubmitting}
            disabled={disabled}
            save={handleSubmit((data) => onSubmit({
              imagePath,
              data: {...data, id},
              enableFields,
              toast
            }))}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default AdminNews;
