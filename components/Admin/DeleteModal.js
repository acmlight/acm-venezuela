import Modal from "../Modal";
import { Flex, Button, Spinner } from "@chakra-ui/react";
import { MdDeleteForever, MdArrowBackIos } from "react-icons/md";

const DeleteProductModal = ({ title, isOpen, onClose, loader, onDelete }) => {
  return (
    <Modal
      isCentered
      title={`¿ Desea eliminar - ${title} ?`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex justifyContent="space-around">
        <Button
          leftIcon={<MdDeleteForever />}
          size="md"
          variant="outline"
          colorScheme="red"
          onClick={() => onDelete()}
        >
          {loader ? <Spinner /> : <>Borrar</>}
        </Button>
        <Button
          leftIcon={<MdArrowBackIos />}
          bg="brand.100"
          color="white"
          boxShadow="md"
          size="md"
          onClick={() => onClose()}
        >
          Regresar
        </Button>
      </Flex>
    </Modal>
  );
};

export default DeleteProductModal;
