import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import { useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import EditButton from "../EditButton";

const AdminSubcategories = ({
  onSubmit,
  id,
  title,
  img,
  imgPath,
  category,
  subcategories,
  page
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
            <Text color="black" fontSize="14px" align="right">
              Categoría: <u style={{ fontWeight: 500 }}>{category}</u>
            </Text>
            <AdminInput
              register={register}
              defaultValue={title}
              label="Título de la categoría"
              id="title"
              options={{ disabled }}
            />
            <AdminInputImage
              register={register}
              img={img}
              path={imgPath}
              id="img"
              label="Imagen de la subcategoría y dimensiones (300 x 300)"
              error={errors.img}
              options={{ disabled }}
              maxSize={60000}
            />
          </Stack>
          <EditButton
            enableFields={enableFields}
            disabled={disabled}
            loader={isSubmitting}
            save={handleSubmit((data) =>
              onSubmit({
                data: {
                  ...data,
                  id,
                  imgPath,
                  category,
                },
                enableFields,
                subcategories,
                catalog: page.id,
                edit:true,
                toast
              })
            )}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default AdminSubcategories;
