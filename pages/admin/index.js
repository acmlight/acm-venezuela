import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";

import { SimpleGrid, Button, useDisclosure, Text } from "@chakra-ui/react";
import MedicalCategories from "../../components/Admin/General/MedicalCategories";

import Modal from "../../components/Modal";
import { useState } from "react";
import MedicalModal from "../../components/Admin/General/MedicalModal";

import { submitMedicalCategory } from "../../utils/adminForms";

const Admin = ({ pages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInput, setModalInput] = useState();
  const [modalTitle, setModalTitle] = useState();
  const handleMedicalModal = () => {
    setModalTitle("Añadir categoría médica");
    setModalInput(
      <MedicalModal onClose={onClose} onSubmit={submitMedicalCategory} />
    );
    onOpen();
  };

  return (
    <>
      <AdminLayout pages={pages} auth={auth}>
        <Modal
          title={modalTitle}
          scrollBehavior="inside"
          isOpen={isOpen}
          onClose={onClose}
        >
          {modalInput}
        </Modal>

        <Button
          bg="brand.100"
          color="white"
          boxShadow="md"
          m="10px 0 20px 0"
          onClick={() => handleMedicalModal()}
        >
          Añadir categoría
        </Button>
        <SimpleGrid columns={2} spacing={8}>
          {pages.map((page) => (
            <MedicalCategories
              key={page.id}
              onSubmit={submitMedicalCategory}
              {...page}
            />
          ))}
        </SimpleGrid>
      </AdminLayout>
    </>
  );
};

export default Admin;

export async function getServerSideProps(ctx) {
  const { handlePagesData } = await import("../../firebase/api");
  const pages = await handlePagesData();

  return {
    props: {
      pages,
    },
  };
}
