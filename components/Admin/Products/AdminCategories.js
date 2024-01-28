import AdminInput from "../AdminInput";
import { useForm } from "react-hook-form";
import { Card, CardBody, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import EditButton from "../EditButton";

const AdminCategories = ({
  categories,
  onSubmit,
  btnTitle,
  page,
  department,
  handleModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [disabled, setDisabled] = useState(true);
  const toast = useToast()

  const modalTitle = department
    ? `Añadir departamento para ${page.title}`
    : `Añadir categoría para ${page.title}`;
  const enableFields = () => {
    setDisabled(!disabled);
  };

  return (
    <Card variant="elevated">
      <CardBody>
        <Button
          bg="brand.100"
          color="white"
          boxShadow="md"
          size="sm"
          m="10px 0 20px 0"
          onClick={() => handleModal(modalTitle, department)}
        >
          {btnTitle}
        </Button>
        <form style={{ padding: "10px 30px" }}>
          <SimpleGrid minChildWidth="180px" spacing="30px">
            {categories &&
              categories.map((cat) => (
                <AdminInput
                  key={cat.id}
                  register={register}
                  defaultValue={cat.title}
                  label="Título de la categoría"
                  id={cat.id}
                  options={{ disabled }}
                />
              ))}
          </SimpleGrid>
          {categories && categories.length > 0 && (
            <EditButton
              enableFields={enableFields}
              disabled={disabled}
              loader={isSubmitting}
              save={handleSubmit((data) =>
                onSubmit({
                  data,
                  enableFields,
                  department,
                  page,
                  edit: true,
                  toast
                })
              )}
            />
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default AdminCategories;
