import AdminInput from "../AdminInput";
import AdminInputImage from "../AdminInputImage";
import {
  Card,
  CardBody,
  Stack,
  Box,
  useToast,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BsFillTrashFill } from "react-icons/bs";
import IconButton from "../../IconButton";
import { deleteTestimony } from "../../../firebase/delete";
import EditButton from "../EditButton";
import { useState } from "react";
import { submitTestimonials } from "../../../utils/adminForms";
import DeleteModal from "../DeleteModal";

const AdminTestimonials = ({
  id,
  link,
  portrait,
  portraitPath,
  uploadedAt,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleDelete = async () => {
    try {
      setLoader(true);
      await deleteTestimony(id, portraitPath);
      toast({
        description: "Testimonio eliminado correctamente",
        status: "success",
        duration: 3000,
      });
      onClose();
      setLoader(false);
    } catch (e) {
      toast({
        description: e.message,
        status: "error",
        duration: 3000,
      });
      onClose();
      setLoader(false);
    }
  };
  const enableFields = () => {
    setDisabled(!disabled);
  };

  return (
    <Card variant="elevated" position="relative">
      <DeleteModal
        title={`testimonio ${id}`}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDelete}
        loader={loader}
      />
      <Box
        sx={{ position: "absolute", top: -3, right: -3 }}
        onClick={() => onOpen()}
      >
        <IconButton
          style={{
            background: "red",
            color: "white",
          }}
          size="xs"
          icon={<BsFillTrashFill />}
          label="Borrar"
        />
      </Box>

      <CardBody>
        <form>
          <Stack spacing="12px">
            {/* <AdminInput
              register={register}
              error={errors.link}
              defaultValue={link}
              label="Link del video"
              id="link"
              options={{
                disabled,
              }}
            /> */}
            <a href={link} target="_blank">
              <Text fontSize="xs" color="brand.300" textDecor='underline'>
                {link}
              </Text>
            </a>
            <AdminInputImage
              register={register}
              img={portrait}
              path={portraitPath}
              id="portrait"
              label="Imagen referencial (peso menor a 80kb) y dimensiones (340 x 530)"
              maxSize={80000}
              error={errors.portrait}
              options={{
                disabled,
              }}
            />
            <Text fontSize="sm" color="brand.500">
              Creado el {uploadedAt}
            </Text>
          </Stack>
          <EditButton
            enableFields={enableFields}
            disabled={disabled}
            loader={isSubmitting}
            save={handleSubmit((data) =>
              submitTestimonials({
                id,
                link,
                data,
                toast,
                prevPortraitPath: portraitPath,
                enableFields,
                edit: true,
              })
            )}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default AdminTestimonials;
