import { Card, CardBody, useDisclosure, Stack, Text, Box, useToast } from "@chakra-ui/react";
import DeleteModal from "../DeleteModal";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import IconButton from "../../IconButton";
import { useState } from "react";
import { deleteBrand } from "../../../firebase/delete";

const BrandCategories = ({ title, id, img }) => {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const toast = useToast()
  const [loader,setLoader] = useState()

  const handleDelete = async () => {
    try {
      setLoader(true);
      await deleteBrand(id);
      toast({
        description: "Fabricante eliminado correctamente",
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

  return (
    <Card variant="elevated">
      <DeleteModal
        title="fabricante"
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
        <Stack spacing="12px">
          <Stack direction="row">
            <Text fontSize="12px" fontWeight="500">
              Fabricante:{" "}
            </Text>
            <Text fontSize="12px">
              {title}{" "}
            </Text>
          </Stack>
          <Stack direction="row">
            <Text fontSize="12px" fontWeight="500">
              Logo:{" "}
            </Text>
            <Image
              src={img}
              alt="Partner de ACM Venezuela"
              width={35}
              height={35}
            />
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BrandCategories;
